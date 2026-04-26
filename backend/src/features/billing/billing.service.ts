import mongoose from 'mongoose';
import type { QueryFilter } from 'mongoose';
import { Billing, type BillingType } from './billing.model';
import { AppError } from '../../error';
import { Rental, type RentalType } from '../rental/rental.model';
import { sendNotification } from '../notification/notification.service';
import { buildQuery } from '../../utils';
import { HousingFacility } from '../facility/facility.model';
import { Unit } from '../unit/unit.model';
import { combineFilters } from '../../middleware';
import { DocumentType } from '../document/document.model';

export type CreateBillingArguments = {
  rentalId: mongoose.Types.ObjectId;
  dueDate: Date;

  paymentMethod: {
    method: 'gcash' | 'bank_transfer';
    qr: DocumentType[];
  }[];

  breakdown: {
    name: string;
    amount: number;
  }[];
};

export type UpdateBillingArguments = {
  dueDate?: Date;
};

export type submitBillingPaymentArguments = {
  paymentMethod: 'gcash' | 'bank_transfer';
  file: string;
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
  paymentStatus: 'unpaid' | 'paid' | 'overdue';
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
    paymentMethod: data.paymentMethod,
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
  filters: QueryFilter<BillingType>,
) => {
  // Get Facilities owned by User
  const facilities = await HousingFacility.find({ userId });
  const facilityIds = facilities.map((f) => f._id);

  // Get all bilings related to those facilities

  // Generates what occupancy per facility
  const [facilityUnitCount, facilityUnitsOccupied] = await Promise.all([
    //total units by facility
    Unit.aggregate([
      { $match: { facilityId: { $in: facilityIds } } },
      { $group: { _id: '$facilityId', totalUnits: { $sum: 1 } } },
    ]),
    Rental.find(
      { facilityId: { $in: facilityIds }, status: 'active' },
      { unitId: 1, facilityId: 1 },
    ),
  ]);

  const unitStatistics = facilityUnitCount.map((u) => {
    const fId = u._id.toString();
    const occupiedCount = new Set(
      facilityUnitsOccupied
        .filter((r) => r.facilityId.toString() === fId)
        .map((r) => r.unitId.toString()),
    ).size;
    return {
      _id: u._id,
      totalUnits: u.totalUnits,
      occupiedUnits: occupiedCount,
    };
  });

  // Generates monthly income and outstanding of facility per month
  const incomeStatistics = await Billing.aggregate([
    {
      $match: combineFilters<BillingType>(filters, {
        facilityId: { $in: facilityIds },
      }),
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
    const facilityUnits = unitStatistics.find((u) => idString === u._id.toString());

    // Add total income and outstanding
    const facilityStatistics = incomeStatistics.filter((u) => idString === u.facilityId.toString());
    const facilityTotalIncome = facilityStatistics.reduce((a, c) => a + c.monthlyIncome, 0);
    const facilityTotalOutstanding = facilityStatistics.reduce((a, c) => a + c.outstanding, 0);

    return {
      id: f._id,
      name: f.name,
      thumbnail: f.media[0]?.value ?? null,
      units: facilityUnits?.totalUnits,
      totalOccupied: facilityUnits?.occupiedUnits,
      income: facilityTotalIncome,
      outstanding: facilityTotalOutstanding,
    };
  });

  return {
    // FOR DASHBOARD
    dashboard: {
      totalIncome,
      totalOutstanding,
      occupancyRate: totalUnits > 0 ? Math.round((totalOccupied / totalUnits) * 100) : 0,
      collectionRate:
        totalIncome + totalOutstanding > 0
          ? Math.round((totalIncome / (totalIncome + totalOutstanding)) * 100)
          : 0,
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
  const [facility, totalUnits, occupiedUnits, incomeStatistics] = await Promise.all([
    HousingFacility.findById(facilityId).lean(), // facility
    Unit.countDocuments({ facilityId }), // total units
    Rental.distinct('unitId', { facilityId, status: 'active' }), // occupied units
    Billing.aggregate([
      { $match: combineFilters<BillingType>(filters, { facilityId }) },
      // Multople aggreations can be done in one query using $facet
      {
        $facet: {
          monthlyStatistics: [
            {
              $group: {
                _id: { year: { $year: '$dueDate' }, month: { $month: '$dueDate' } },
                monthlyIncome: {
                  $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
                },
                outstanding: {
                  $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
                },
                monthlyUnpaid: { $sum: { $cond: [{ $eq: ['$paymentStatus', 'unpaid'] }, 1, 0] } },
                monthlyCount: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                year: '$_id.year',
                month: '$_id.month',
                monthlyIncome: 1,
                outstanding: 1,
                monthlyUnpaid: 1,
                monthlyCount: 1,
              },
            },
          ],
          totals: [
            {
              $group: {
                _id: null,
                totalIncome: {
                  $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
                },
                totalOutstanding: {
                  $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
                },
                totalUnpaid: {
                  $sum: { $cond: [{ $eq: ['$paymentStatus', 'unpaid'] }, '$totalAmount', 0] },
                },
                totalBills: { $sum: 1 },
              },
            },
          ],
          breakdown: [
            {
              $match: {
                facilityId,
                paymentStatus: 'paid',
              },
            },
            { $unwind: '$breakdown' },
            {
              $group: {
                _id: '$breakdown.name',
                value: { $sum: '$breakdown.amount' },
              },
            },
            {
              $project: {
                _id: 0,
                name: '$_id',
                value: 1,
              },
            },
          ],
        },
      },
    ]),
  ]);

  if (!facility) throw new AppError(404, 'Facility not found');

  const totalOccupiedUnits = occupiedUnits.length;
  const { monthlyStatistics, totals, breakdown } = incomeStatistics[0];
  const facilityTotals = totals[0] || {
    totalIncome: 0,
    totalOutstanding: 0,
    totalUnpaid: 0,
    totalBills: 0,
  };

  const collectionRate =
    facilityTotals.totalIncome + facilityTotals.totalOutstanding > 0
      ? Math.round(
          (facilityTotals.totalIncome /
            (facilityTotals.totalIncome + facilityTotals.totalOutstanding)) *
            100,
        )
      : 0;
  const occupancyRate = totalUnits > 0 ? Math.round((totalOccupiedUnits / totalUnits) * 100) : 0;

  return {
    facilityInfo: {
      id: facility._id,
      name: facility.name,
      address: facility.location.text ?? 'Unknown Address',
    },
    overview: {
      occupancyRate: occupancyRate,
      collectionRate: collectionRate,
    },
    breakdown: {
      monthlyIncome: facilityTotals.totalIncome,
      incomeBreakdown: breakdown,
    },
  };
};

export const getTenantBillings = async (
  query: Partial<GetBillingArguments>,
  filters: QueryFilter<BillingType>,
) => {
  // Prepare Billings
  const billings = await Billing.where(buildQuery(query))
    .find(filters)
    .populate('userId', 'firstName lastName profilePicture contact')
    .populate('unitId', 'roomNumber')
    .populate('facilityId', 'name')
    .lean();

  // Map to add needed data
  const billingsDetails = billings.map((b) => {
    const student = b.userId as unknown as {
      firstName: string;
      lastName: string;
      profilePicture?: string;
      contact: string;
    };
    const unit = b.unitId as unknown as {
      roomNumber: string;
    };
    const facility = b.facilityId as unknown as {
      name: string;
    };

    return {
      id: b._id,

      tenantName: `${student.firstName} ${student.lastName}`,
      profilePicture: student.profilePicture || null,

      facilityName: facility.name,

      unitName: unit.roomNumber,
      dueDate: b.dueDate,
      status: b.paymentStatus,
      amount: b.totalAmount,
    };
  });

  return billingsDetails;
};

// Get billings of a Student
export const getUserBillings = async (
  userId: mongoose.Types.ObjectId,
  query: Partial<GetBillingArguments>,
  filters: QueryFilter<BillingType>,
) => {
  const matchFilters = combineFilters(combineFilters(buildQuery(query), { userId }), filters);
  const userBillingsSummary = await Billing.aggregate([
    { $match: matchFilters },
    {
      $facet: {
        monthlyStatistics: [
          {
            $group: {
              _id: { year: { $year: '$dueDate' }, month: { $month: '$dueDate' } },
              monthlyExpense: { $sum: '$totalAmount' },
              monthlyOutstanding: {
                $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
              },
              breakdownList: { $push: '$breakdown' },
            },
          },
          {
            $addFields: {
              // flatten the breakdwonlist to get total
              breakdown: {
                $reduce: {
                  input: '$breakdownList',
                  initialValue: [],
                  in: { $concatArrays: ['$$value', '$$this'] },
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              year: '$_id.year',
              month: '$_id.month',
              monthlyExpense: 1,
              monthlyOutstanding: 1,
              breakdown: 1,
            },
          },
          { $sort: { year: -1, month: -1 } },
        ],

        totals: [
          {
            $group: {
              _id: null,
              totalExpense: { $sum: '$totalAmount' },
              totalOutstanding: {
                $sum: { $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0] },
              },
              currentStatus: {
                $min: {
                  $cond: [
                    { $eq: ['$paymentStatus', 'overdue'] },
                    1,
                    { $cond: [{ $eq: ['$paymentStatus', 'unpaid'] }, 2, 3] },
                  ],
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              totalExpense: 1,
              totalOutstanding: 1,
              currentStatus: {
                $switch: {
                  branches: [
                    { case: { $eq: ['$currentStatus', 1] }, then: 'overdue' },
                    { case: { $eq: ['$currentStatus', 2] }, then: 'unpaid' },
                    { case: { $eq: ['$currentStatus', 3] }, then: 'paid' },
                  ],
                  default: 'paid',
                },
              },
            },
          },
        ],
        billList: [
          { $sort: { dueDate: -1 } },
          {
            $project: {
              _id: 1,
              dueDate: 1,
              totalAmount: 1,
              paymentStatus: 1,
            },
          },
        ],
        currentFacility: [
          { $sort: { dueDate: -1 } },
          { $limit: 1 },
          {
            $lookup: {
              from: 'housingfacilities',
              localField: 'facilityId',
              foreignField: '_id',
              as: 'facility',
            },
          },
          { $unwind: '$facility' },
          {
            $project: {
              _id: 0,
              name: '$facility.name',
              address: '$facility.location.text',
            },
          },
        ],
      },
    },
  ]);

  const data = userBillingsSummary[0] || {
    monthlyStatistics: [],
    totals: [],
    billList: [],
    currentFacility: [],
  };

  //Contains all data for main dashboard
  const summary = data.totals[0] || { totalExpense: 0, totalOutstanding: 0, currentStatus: 'paid' };

  //
  const facilityDetails = data.currentFacility[0];
  if (!facilityDetails) throw new AppError(404, 'Biilling facility not found');

  return {
    summary: {
      totalExpense: summary.totalExpense,
      totalOutstanding: summary.totalOutstanding,
      currentStatus: summary.currentStatus,
    },
    facilityDetails,
    monthlyStatistics: data.monthlyStatistics,
    unpaidPayments: data.billList.filter((b: any) => b.paymentStatus !== 'paid'),
    billingHistory: data.billList.filter((b: any) => b.paymentStatus === 'paid'),
  };
};

export const sumbitBillingPayment = async (
  billingId: mongoose.Types.ObjectId,
  data: submitBillingPaymentArguments,
  filters: QueryFilter<BillingType>,
) => {
  const billing = await Billing.findOne(combineFilters<BillingType>({ _id: billingId }, filters));
  if (!billing) throw new AppError(404, 'Billing not found.');

  const receiptDocument: DocumentType = {
    docId: new mongoose.Types.ObjectId().toString(),
    name: `Recipt for ${billing._id}`,
    status: 'pending',
    files: [data.file],
    message: `Payment method: ${data.paymentMethod}`,
  };
  billing.documents.push(receiptDocument);
  return await billing.save();
};
