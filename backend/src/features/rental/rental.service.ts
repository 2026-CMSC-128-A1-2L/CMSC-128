import type mongoose from 'mongoose';
import { AppError } from '../../error';
import { combineFilters } from '../../middleware';
import { ApplicationForm } from '../application/application.model';
import { Rental } from './rental.model';
import { Unit } from '../unit/unit.model';
import { UnitFilterSchema } from 'shared';

// TODO: verify if actual move-in/out dates are needed
// No activities field yet
export type CreateRentalArguments = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  unitId: mongoose.Types.ObjectId;

  applicationId?: mongoose.Types.ObjectId;

  expectedMoveInDate?: Date | null;
  expectedMoveOutDate?: Date | null;
};

// No activities field yet
export type UpdateRentalArguments = {
  status?: string | null;

  expectedMoveInDate?: Date | null;
  expectedMoveOutDate?: Date | null;
  actualMoveInDate?: Date | null;
  actualMoveOutDate?: Date | null;
};

export const createRental = async (data: CreateRentalArguments) => {
  if (
    data.expectedMoveInDate &&
    data.expectedMoveOutDate &&
    data.expectedMoveInDate > data.expectedMoveOutDate
  ) {
    throw new AppError(422, 'Expected move-out date should not be before expected move-in date.');
  }

  const unit = await Unit.findById(data.unitId);

  if (!unit) throw new AppError(404, 'Unit not found.');

  if (unit.currentRentals.length >= unit.capacity) {
    throw new AppError(400, 'Unit is already at full capacity.');
  }

  const newRental = await new Rental({
    userId: data.userId,
    unitId: data.unitId,
    applicationId: data.applicationId,
    status: 'active',
    expectedMoveInDate: data.expectedMoveInDate,
    expectedMoveOutDate: data.expectedMoveOutDate,
  }).save();

  // add the rental id of the newly created rental to the currentRentals of unit
  unit.currentRentals.push(newRental._id);
  await unit.save();

  return newRental;
};

export const getAllRentals = async (filters: any) => {
  return await Rental.find(filters);
};

export const updateRental = async (
  rentalId: mongoose.Types.ObjectId,
  data: UpdateRentalArguments,
  filters: any,
) => {
  const rental = await Rental.findOne(combineFilters(filters, { _id: rentalId }));

  if (!rental) {
    const rentalNoFilter = await Rental.findById(rentalId);

    if (rentalNoFilter) {
      throw new AppError(403, 'You cannot edit this rental.');
    } else {
      throw new AppError(404, 'Rental not found.');
    }
  }

  if (
    data.expectedMoveInDate &&
    data.expectedMoveOutDate &&
    data.expectedMoveInDate > data.expectedMoveOutDate
  ) {
    throw new AppError(422, 'Expected move-out date should not be before expected move-in date.');
  }

  if (
    data.actualMoveInDate &&
    data.actualMoveOutDate &&
    data.actualMoveInDate > data.actualMoveOutDate
  ) {
    throw new AppError(422, 'Actual move-out date should not be before actual move-in date.');
  }

  rental.set(data);

  return await rental.save();
};

export const deleteRental = async (rentalId: mongoose.Types.ObjectId, filters: any) => {
  const rental = await Rental.findOne(combineFilters(filters, { _id: rentalId }));

  if (!rental) {
    const rentalNoFilter = await Rental.findById(rentalId);

    if (rentalNoFilter) {
      throw new AppError(403, 'You cannot delete this rental.');
    } else {
      throw new AppError(404, 'Rental not found.');
    }
  }

  return await rental.deleteOne();
};

export const getRentalsByUnitId = async (unitId: mongoose.Types.ObjectId, filters: any) => {
  const rentals = await Rental.find(combineFilters(filters, { unitId }));

  if (!rentals.length) {
    const rentalsNoFilter = await Rental.find({ unitId });

    if (rentalsNoFilter) {
      throw new AppError(403, "You don't have permission to view these rentals.");
    } else {
      throw new AppError(404, 'Rentals not found.');
    }
  }

  return rentals;
};

export const getRental = async (rentalId: mongoose.Types.ObjectId, filters: any) => {
  const rental = await Rental.findOne(combineFilters(filters, { rentalId }));

  if (!rental) {
    const rentalNoFilter = await Rental.findOne({ rentalId });

    if (rentalNoFilter) {
      throw new AppError(403, "You don't have permission to view this rental.");
    } else {
      throw new AppError(404, 'Rental not found.');
    }
  }

  return rental;
};

export const getRentalsByUser = async (userId: mongoose.Types.ObjectId, filters: any) => {
  const rentals = await Rental.find(combineFilters(filters, { userId }));

  if (!rentals.length) {
    const rentalsNoFilter = await Rental.find({ userId });

    if (rentalsNoFilter) {
      throw new AppError(403, "You don't have permission to view these rentals.");
    } else {
      throw new AppError(404, 'Rentals not found.');
    }
  }

  return rentals;
};

export const getRentalsByListing = async (listingId: mongoose.Types.ObjectId, filters: any) => {
  const applications = await ApplicationForm.find({ listingId }).select('_id');

  if (!applications.length) {
    throw new AppError(404, 'No applications found for this listing.');
  }

  const applicationIds = applications.map((app) => app._id);

  const rentals = await Rental.find(
    combineFilters(filters, { applicationId: { $in: applicationIds } }),
  );

  if (!rentals.length) {
    const rentalsNoFilter = await Rental.find({ applicationId: { $in: applicationIds } });

    if (rentalsNoFilter.length) {
      throw new AppError(403, "You don't have permission to view these rentals.");
    } else {
      throw new AppError(404, 'No rentals found for this listing.');
    }
  }

  return rentals;
};

// set status to active
// actualMoveInDate param is optional (set to curr date if null)
export const moveIn = async (
  rentalId: mongoose.Types.ObjectId,
  filters: any,
  actualMoveInDate?: Date,
) => {
  const rental = await Rental.findOne(combineFilters(filters, { _id: rentalId }));

  if (!rental) {
    const rentalNoFilter = await Rental.findById(rentalId);

    if (rentalNoFilter) {
      throw new AppError(403, 'You cannot move in to this rental.');
    } else {
      throw new AppError(404, 'Rental not found.');
    }
  }

  if (rental.status !== 'inactive') {
    if (rental.status === 'active') {
      throw new AppError(422, 'Tenant has already moved in to this rental.');
    } else if (rental.status === 'ended') {
      throw new AppError(422, 'This rental has already ended.');
    } else {
      throw new AppError(422, `Cannot move in to a rental with status '${rental.status}'.`); // for on_waitlist
    }
  }

  const moveInDate = actualMoveInDate ?? new Date();

  rental.set({
    status: 'active',
    actualMoveInDate: moveInDate,
  });

  return await rental.save();
};

// set status to ended
// actualMoveOutDate param is optional (set to curr date if null)
export const moveOut = async (
  rentalId: mongoose.Types.ObjectId,
  filters: any,
  actualMoveOutDate?: Date,
) => {
  const rental = await Rental.findOne(combineFilters(filters, { _id: rentalId }));

  if (!rental) {
    const rentalNoFilter = await Rental.findById(rentalId);

    if (rentalNoFilter) {
      throw new AppError(403, 'You cannot move out of this rental.');
    } else {
      throw new AppError(404, 'Rental not found.');
    }
  }

  if (rental.status !== 'active') {
    if (rental.status === 'inactive') {
      throw new AppError(422, 'Tenant has not yet moved in to this rental.');
    } else if (rental.status === 'ended') {
      throw new AppError(422, 'This rental has already ended.');
    } else {
      throw new AppError(422, `Cannot move out to a rental with status '${rental.status}'.`);
    }
  }

  const moveOutDate = actualMoveOutDate ?? new Date();

  if (rental.actualMoveInDate && moveOutDate < rental.actualMoveInDate) {
    throw new AppError(422, 'Actual move-out date cannot be before the actual move-in date.');
  }

  rental.set({
    status: 'ended',
    actualMoveOutDate: moveOutDate,
  });

  await rental.save();

  // remove current rental to the currentRentals of the unit
  await Unit.updateOne({ _id: rental.unitId }, { $pull: { currentRentals: rental._id } });

  return rental;
};
