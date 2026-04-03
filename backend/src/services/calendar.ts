import mongoose from 'mongoose';
import { VisitBooking } from '../models/student-actions/VisitBooking.js';
import { Billing } from '../models/student-actions/Billing.js';
import { Rental } from '../models/student-actions/Rents.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { Listing } from '../models/housing/Listing.js';
import { Unit } from '../models/housing/Unit.js';

export type CalendarEvent = {
  type: 'booking' | 'billing' | 'move-in' | 'move-out';
  date: Date;
  title: string;
  referenceId: mongoose.Types.ObjectId;
};

export const getCalendar = async (
  userId: mongoose.Types.ObjectId,
  userType: string,
  year: number,
  month: number,
): Promise<CalendarEvent[]> => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const events: CalendarEvent[] = [];

  if (userType === 'Student') {
    const bookings = await VisitBooking.find({
      studentId: userId,
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });
    for (const b of bookings) {
      events.push({ type: 'booking', date: b.startDate, title: 'Visit booking', referenceId: b._id });
    }

    const billings = await Billing.find({
      studentId: userId,
      dueDate: { $gte: startDate, $lte: endDate },
    });
    for (const b of billings) {
      if (b.dueDate) {
        events.push({ type: 'billing', date: b.dueDate, title: `Billing due (${b.paymentType})`, referenceId: b._id });
      }
    }

    const rentals = await Rental.find({
      studentId: userId,
      $or: [
        { expectedMoveInDate: { $gte: startDate, $lte: endDate } },
        { actualMoveInDate: { $gte: startDate, $lte: endDate } },
        { expectedMoveOutDate: { $gte: startDate, $lte: endDate } },
        { actualMoveOutDate: { $gte: startDate, $lte: endDate } },
      ],
    });
    for (const r of rentals) {
      if (r.expectedMoveInDate && r.expectedMoveInDate >= startDate && r.expectedMoveInDate <= endDate) {
        events.push({ type: 'move-in', date: r.expectedMoveInDate, title: 'Expected move-in', referenceId: r._id });
      }
      if (r.actualMoveInDate && r.actualMoveInDate >= startDate && r.actualMoveInDate <= endDate) {
        events.push({ type: 'move-in', date: r.actualMoveInDate, title: 'Move-in', referenceId: r._id });
      }
      if (r.expectedMoveOutDate && r.expectedMoveOutDate >= startDate && r.expectedMoveOutDate <= endDate) {
        events.push({ type: 'move-out', date: r.expectedMoveOutDate, title: 'Expected move-out', referenceId: r._id });
      }
      if (r.actualMoveOutDate && r.actualMoveOutDate >= startDate && r.actualMoveOutDate <= endDate) {
        events.push({ type: 'move-out', date: r.actualMoveOutDate, title: 'Move-out', referenceId: r._id });
      }
    }
  } else if (userType === 'Manager' || userType === 'Landlord') {
    let facilityIds: mongoose.Types.ObjectId[] = [];

    if (userType === 'Landlord') {
      const facilities = await HousingFacility.find({ landlordId: userId }).select('_id');
      facilityIds = facilities.map((f) => f._id as mongoose.Types.ObjectId);
    } else {
      const facilities = await HousingFacility.find({
        'managers.managerId': userId,
      }).select('_id');
      facilityIds = facilities.map((f) => f._id as mongoose.Types.ObjectId);
    }

    if (facilityIds.length > 0) {
      const bookings = await VisitBooking.find({
        housingId: { $in: facilityIds },
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      });
      for (const b of bookings) {
        events.push({ type: 'booking', date: b.startDate, title: 'Visit booking', referenceId: b._id });
      }

      const listings = await Listing.find({ housingId: { $in: facilityIds } }).select('_id');
      const listingIds = listings.map((l) => l._id as mongoose.Types.ObjectId);

      if (listingIds.length > 0) {
        const units = await Unit.find({ listingId: { $in: listingIds } }).select('_id');
        const unitIds = units.map((u) => u._id as mongoose.Types.ObjectId);

        if (unitIds.length > 0) {
          const billings = await Billing.find({
            unitId: { $in: unitIds },
            dueDate: { $gte: startDate, $lte: endDate },
          });
          for (const b of billings) {
            if (b.dueDate) {
              events.push({ type: 'billing', date: b.dueDate, title: `Billing due (${b.paymentType})`, referenceId: b._id });
            }
          }

          const rentals = await Rental.find({
            unitId: { $in: unitIds },
            $or: [
              { expectedMoveInDate: { $gte: startDate, $lte: endDate } },
              { actualMoveInDate: { $gte: startDate, $lte: endDate } },
              { expectedMoveOutDate: { $gte: startDate, $lte: endDate } },
              { actualMoveOutDate: { $gte: startDate, $lte: endDate } },
            ],
          });
          for (const r of rentals) {
            if (r.expectedMoveInDate && r.expectedMoveInDate >= startDate && r.expectedMoveInDate <= endDate) {
              events.push({ type: 'move-in', date: r.expectedMoveInDate, title: 'Expected move-in', referenceId: r._id });
            }
            if (r.actualMoveInDate && r.actualMoveInDate >= startDate && r.actualMoveInDate <= endDate) {
              events.push({ type: 'move-in', date: r.actualMoveInDate, title: 'Move-in', referenceId: r._id });
            }
            if (r.expectedMoveOutDate && r.expectedMoveOutDate >= startDate && r.expectedMoveOutDate <= endDate) {
              events.push({ type: 'move-out', date: r.expectedMoveOutDate, title: 'Expected move-out', referenceId: r._id });
            }
            if (r.actualMoveOutDate && r.actualMoveOutDate >= startDate && r.actualMoveOutDate <= endDate) {
              events.push({ type: 'move-out', date: r.actualMoveOutDate, title: 'Move-out', referenceId: r._id });
            }
          }
        }
      }
    }
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};
