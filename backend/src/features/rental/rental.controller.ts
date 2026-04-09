import { RequestHandler } from 'express';
import { GetRentalsQuerySchema, RentalFilterSchema, ObjectIdSchema, UpdateRentalBodySchema, MoveInBodySchema, MoveOutBodySchema } from 'shared';
import { getAllRentals, updateRental, deleteRental, getRental, getRentalsByUser, getRentalsByListing, getRentalsByUnitId, moveIn, moveOut } from './rental.service';

export const routeGetRentals: RequestHandler = async (req, res, next) => {
  const filters = GetRentalsQuerySchema.parse(req.query);
  const rentals = await getAllRentals(filters);

  res.status(200).json({
    status: 'success',
    data: rentals,
  });
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

export const routeGetRental: RequestHandler = async (req, res, next) => {
  const rentalId = ObjectIdSchema.parse(req.params.rentalId);
  const rental = await getRental(rentalId, res.locals.filters ?? {});

  res.status(200).json(rental);
};

export const routeGetRentalsByUser: RequestHandler = async (req, res, next) => {
  const userId = ObjectIdSchema.parse(req.params.userId);

  const rentals = await getRentalsByUser(userId, res.locals.filters ?? {});
  res.status(200).json(rentals);
};

export const routeGetRentalsByListing: RequestHandler = async (req, res, next) => {
  const listingId = ObjectIdSchema.parse(req.params.listingId);

  const rentals = await getRentalsByListing(listingId, res.locals.filters ?? {});
  res.status(200).json(rentals);
};

export const routeGetRentalsByUnit: RequestHandler = async (req, res, next) => {
  const unitId = ObjectIdSchema.parse(req.params.unitId);
  const rentals = await getRentalsByUnitId(unitId, res.locals.filters ?? {});
  res.status(200).json(rentals);
};

export const routeMoveIn: RequestHandler = async (req, res, next) => {
  const rentalId = ObjectIdSchema.parse(req.params.rentalId);
  const { actualMoveInDate } = MoveInBodySchema.parse(req.body);

  const rental = await moveIn(rentalId, res.locals.filters ?? {}, actualMoveInDate);

  res.status(200).json({
    status: 'success',
    data: rental,
  });
};

export const routeMoveOut: RequestHandler = async (req, res, next) => {
  const rentalId = ObjectIdSchema.parse(req.params.rentalId);
  const { actualMoveOutDate } = MoveOutBodySchema.parse(req.body);

  const rental = await moveOut(rentalId, res.locals.filters ?? {}, actualMoveOutDate);

  res.status(200).json({
    status: 'success',
    data: rental,
  });
};
