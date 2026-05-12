import type {
  CreateBookingBodySchema,
  UpdateBookingStatusBodySchema,
  BookingFilterSchema,
  GetBookingsQuerySchema,
} from 'shared';
import type z from 'zod';

export type CreateBookingBody = z.infer<typeof CreateBookingBodySchema>;
export type UpdateBookingStatusBody = z.infer<typeof UpdateBookingStatusBodySchema>;
export type BookingFilter = z.infer<typeof BookingFilterSchema>;
export type GetBookingsQuery = z.infer<typeof GetBookingsQuerySchema>;
