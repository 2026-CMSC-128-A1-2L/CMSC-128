import { RequestHandler } from 'express';
import { getRentals, updateRental, deleteRental } from '../services/rentals';
import { ObjectIdSchema } from './schema/common';
import { UpdateRentalBodySchema } from './schema/rental';

export const routeCreateRental: RequestHandler = async (req, res, next) => { };

export const routeGetRentals: RequestHandler = async (req, res, next) => {
  return await getRentals();
};

export const routeUpdateRental: RequestHandler = async (req, res, next) => {
  const rentalId = ObjectIdSchema.parse(req.params.rentalId);
  const updateData = UpdateRentalBodySchema.parse(req.body);

  const updatedRental = await updateRental(rentalId, updateData, res.locals.filters ?? {});

  res.status(200).json({
    data: updatedRental,
  });
};

export const routeDeleteRental: RequestHandler = async (req, res, next) => {
  const rentalId = ObjectIdSchema.parse(req.params.rentalId);

  await deleteRental(rentalId, res.locals.filters ?? {});

  res.status(200).json({
    message: 'Rental deleted successfully',
  });
};
