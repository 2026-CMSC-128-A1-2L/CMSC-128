  import type mongoose from 'mongoose';
  import type { QueryFilter } from 'mongoose';
  import { Billing, type BillingType } from './billing.model';
  import { AppError } from '../../error';
  import { Rental, type RentalType } from '../rental/rental.model';
  import { sendNotification } from '../notification/notification.service';
  import { buildQuery } from '../../utils';
  import { HousingFacility } from '../facility/facility.model';
  import { Unit } from '../unit/unit.model';

  export type CreateBillingArguments = {
    rentalId: mongoose.Types.ObjectId;
    dueDate: Date;
    breakdown: {
      name: string;
      amount: number;
    }[];
  };

  export type UpdateBillingArguments = {
    dueDate?: Date;
  };

  export type GetBillingArguments = {
    userId: mongoose.Types.ObjectId;
    unitId: mongoose.Types.ObjectId;
    facilityId: mongoose.Types.ObjectId;
    dueDate: {
      min?: Date;
      max?: Date;
    };
    paymentDate: {
      min?: Date;
      max?: Date;
    };
    paymentStatus: 'unpaid' | 'paid' | 'overdue' | 'partially_paid';
  };

  export const createBilling = async (
    data: CreateBillingArguments,
    filters: QueryFilter<RentalType>,
  ) => {
    const rental = await Rental.where(filters).findOne({ _id: data.rentalId, status: 'active' });
    if (!rental) throw new AppError(404, 'Rental not found.');

    const totalAmount = data.breakdown.map((x) => x.amount).reduce((x, y) => x + y);
    const billing = new Billing({
      userId: rental.userId,
      unitId: rental.unitId,
      facilityId: rental.facilityId,
      dueDate: data.dueDate,
      totalAmount,
      breakdown: data.breakdown,
    });

    const savedBilling = await billing.save();
    await sendNotification(
      rental.userId,
      'New Billing Created',
      `A new billing for ${totalAmount} has been created.`,
    );

    return savedBilling;
  };

  export const getBillings = (
    query: Partial<GetBillingArguments>,
    filters: QueryFilter<BillingType>,
  ) => Billing.where(buildQuery(query)).find(filters);

  export const getBilling = (billingId: mongoose.Types.ObjectId, filters: QueryFilter<BillingType>) =>
    Billing.where(filters).findById(billingId);

  export const updateBilling = async (
    billingId: mongoose.Types.ObjectId,
    data: UpdateBillingArguments,
    filters: QueryFilter<BillingType>,
  ) => {
    return await Billing.where(filters).findOneAndUpdate(
      { _id: billingId },
      { $set: data },
      { returnDocument: 'after' },
    );
  };

  export const updateBillingPayment = async (
    billingId: mongoose.Types.ObjectId,
    amount: number,
    filters: QueryFilter<BillingType>,
  ) => {
    const billing = await Billing.where(filters).findById(billingId);
    if (!billing) throw new AppError(404, 'Billing not found.');

    let allAccepted = true;
    for (const doc of billing.documents) {
      if (doc.status !== 'accepted') {
        allAccepted = false;
        break;
      }
    }

    if (!allAccepted) {
      throw new AppError(422, 'Cannot verify payment without verifying files.');
    }

    billing.totalAmount = amount;
    return await billing.save();
  };

  export const getBillingsSummary = async (
    userId: mongoose.Types.ObjectId,
    query: Partial<GetBillingArguments>,
    filters: QueryFilter<BillingType>,
  ) => {
    // Get Facilities owned by User
    const facilities = await HousingFacility.find({ userId });
    const facilityIds = facilities.map((f) => f._id);

    // Get all bilings related to those facilities

    // Generates what occupancy per facility
    const unitStatistics = await Unit.aggregate([
      {
        $match: {
          facilityId: { $in: facilityIds },
        },
      },
      {
        $group: {
          _id: '$facilityId',
          totalUnits: { $sum: 1 },
          occupiedUnits: { $sum: { $cond: [{ $gt: [{ $size: { $ifNull: ['$currentRentals',[]] } }, 0] }, 1, 0] }},
        },
      },
    ]);

    // Generates monthly income and outstanding of facility per month
    const incomeStatistics = await Billing.aggregate([
      {
        $match: {
          facilityId: { $in: facilityIds },
        },
      },
      {
        $group: {
          _id: {
            facilityId: '$facilityId',
            year: { $year: '$dueDate' },
            month: { $month: '$dueDate' },
          },
          monthlyIncome: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
          },
          outstanding: {
            $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          facilityId: '$_id.facilityId',
          year: '$_id.year',
          month: '$_id.month',
          monthlyIncome: 1,
          outstanding: 1,
        },
      },
    ]);

    // Calculate Totals
    const totalIncome = incomeStatistics.reduce((a, c) => a + c.monthlyIncome, 0);
    const totalOutstanding = incomeStatistics.reduce((a, c) => a + c.outstanding, 0);
    const totalOccupied = unitStatistics.reduce((a, c) => a + c.occupiedUnits, 0);
    const totalUnits = unitStatistics.reduce((a, c) => a + c.totalUnits, 0);

    // For cards
    const billingCards = facilities.map((f) => {
      const idString = f._id.toString();

      // Add unit data
      const facilityUnits = unitStatistics.find((u) => idString == u._id.toString());

      // Add total income and outstanding
      const facilityStatistics = incomeStatistics.filter((u) => idString == u.facilityId.toString());
      const facilityTotalIncome = facilityStatistics.reduce((a, c) => a + c.monthlyIncome, 0);
      const facilityTotalOutstanding = facilityStatistics.reduce((a, c) => a + c.outstanding, 0);

      return {
        id: f._id,
        name: f.name,
        thumbnail: f.media[0]?.value || null,
        units: facilityUnits.totalUnits,
        totalOccupied: facilityUnits.occupiedUnits,
        income: facilityTotalIncome,
        outstanding: facilityTotalOutstanding,
      };
    });

    return {
      // FOR DASHBOARD
      dashboard: {
        totalIncome,
        totalOutstanding,
        occupancyRate: totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0 ,
        collectionRate: (totalIncome + totalOutstanding) > 0 ? Math.round((totalIncome / (totalIncome + totalOutstanding)) * 100) : 0 ,
        incomeStatistics,
      },
      billingCards,
    };
  };

  
  export const getfacilityBilling = async (
    facilityId: mongoose.Types.ObjectId,
    query: Partial<GetBillingArguments>,
    filters: QueryFilter<BillingType>,
  ) => {
    const facility = await HousingFacility.findById(facilityId);
    if (!facility) throw new AppError(404, 'Facility not found');
    

    // Generates what occupancy per facility
      const unitStatistics = await Unit.aggregate([
      {
        $match:{ facilityId }
      },
      {
        $group: {
          _id: {
            facilityId: '$facilityId',
            totalUnits: { $sum: 1 },
            occupiedUnits: { $cond: [{ $gt: [{ $size: '$currentRentals' }, 0] }, 1, 0] },
          },
        },
      },
    ]);

    // Generates Income statistics
    const facilityStatistics = await Billing.aggregate([
      {
        $match:{ facilityId }
      },
      {
        // allows for multiple aggregations
        $facet:{
          'monthlyStatistics':[
            {
              $group:{
                _id:{
                  year:{$year:'$dueDate'},
                  month:{$month:'$dueDate'}
                },
                monthlyIncome: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] } },
                outstanding: { $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] } },
                unpaid: { $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, 1, 0] } },
                totalBills: { $sum: 1 }
              },
            },
            {
              $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                monthlyIncome: 1,
                outstanding: 1,
                unpaid:1,
                totalBills:1,
              },
            },
          ],
          'breakdown':[
            {$match: {paymentStatus:'paid'}},
            {$unwind:'$breakdown.type'},
            {
              $group:{
                _id: '$breakdown.type.name',
                value: { $sum: '$breakdown.type.amount' }
              }
            },
            {
              $project:{
                _id:0, type:'$_id', value:1
              }
            }
          ]
        }
      }
    ]);

    return;
  }

