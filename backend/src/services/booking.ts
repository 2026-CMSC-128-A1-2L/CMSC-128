import z from 'zod';
import { CreateBookingBodySchema, GetBookingsQuerySchema } from '../controllers/schema/booking';
import { VisitBooking } from '../models/student-actions/VisitBooking';

export const createBooking = async (params: z.infer<typeof CreateBookingBodySchema>) => {
  const booking = new VisitBooking(params);
  return await booking.save();
}

export const getBookings = async (params: z.infer<typeof GetBookingsQuerySchema>) => {
  return await VisitBooking.find(params);
}
