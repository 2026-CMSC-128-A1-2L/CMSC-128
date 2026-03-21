import { RequestHandler } from 'express';
import { getRentals, updateRental, deleteRental  } from '../services/rentals';
import { ObjectIdSchema } from './schema/common';
import { UpdateRentalSchema } from './schema/rentals';

export const routeGetRentals: RequestHandler = async (req, res, next) => {
    return await getRentals();
};

export const routeUpdateRental: RequestHandler = async (req, res, next) => {
    const rentalID = ObjectIdSchema.parse(req.params.rentalId);
    const updateData = UpdateRentalSchema.parse(req.body);

    const updatedRental = await updateRental(rentalID, updateData, res.locals.filters ?? {});

    res.status(200).json({
        data: updatedRental
    });
};


export const routeDeleteRental: RequestHandler = async (req, res, next) => {
    const rentalID = ObjectIdSchema.parse(req.params.rentalId);

    await deleteRental(rentalID, res.locals.filters ?? {});

    res.status(200).json({
        message: 'Rental deleted successfully'
    });
};
