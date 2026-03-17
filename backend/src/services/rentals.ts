import mongoose from 'mongoose';
import { Rental } from '../models/student-actions/Rents';
import { AppError } from '../controllers/error';
import { combineFilters } from '../controllers/middleware';

// TODO: verify if actual move-in/out dates are needed 
export type CreateRentalArguments = {
    studentID: mongoose.Types.ObjectId;
    unitID: mongoose.Types.ObjectId;

    applicationID: mongoose.Types.ObjectId;

    expectedMoveInDate?: Date | null;
    expectedMoveOutDate?: Date | null;
};


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

    const newRental = new Rental({
        studentID: data.studentID,
        unitID: data.unitID,

        applicationID: data.applicationID,

        expectedMoveInDate: data.expectedMoveInDate,
        expectedMoveOutDate: data.expectedMoveOutDate
    });

    return await newRental.save();
};


export const getRentals = async () => {
    return await Rental.find();
};

export const updateRentals = async (
    rentalID: mongoose.Types.ObjectId, 
    data: UpdateRentalArguments, 
    filters: any
) => {
    const rental = await Rental.findOne(combineFilters(filters, {_id: rentalID}));

    if (!rental) {
        const rentalNoFilter = await Rental.findById(rentalID);

        if (rentalNoFilter) {
            throw new AppError(403, 'You cannot edit this rental.');
        } else {
            throw new AppError(404, 'Rental not found.')
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

export const deleteRental = async (
    rentalID: mongoose.Types.ObjectId,
    filters: any
) => {
    const rental = await Rental.findOne(combineFilters(filters, {_id: rentalID}));

    if (!rental) {
        const rentalNoFilter = await Rental.findById(rentalID);

        if (rentalNoFilter) {
            throw new AppError(403, 'You cannot delete this rental.');
        } else {
            throw new AppError(404, 'Rental not found.')
        }
    }

    return await rental.deleteOne();
};

