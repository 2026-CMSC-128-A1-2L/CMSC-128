import type mongoose from "mongoose";
import type { QueryFilter } from "mongoose";
import { AppError } from "../../error.js";
import { combineFilters } from "../../middleware.js";
import {
  HousingFacility,
  type HousingFacilityType,
} from "../facility/facility.model.js";
import { type BookingType, VisitBooking } from "./booking.model.js";
import { VisitAvailability } from "../availability/availability.model.js";
import { User } from "../user/user.model.js";
import { buildQuery } from "../../utils.js";
import type { BookingStatusType } from "shared";
import { sendNotification } from "../notification/notification.service.js";

export type CreateBookingArguments = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;

  startDate: Date;
  endDate: Date;

  status?: BookingStatusType;
  message?: string;
};

export type GetBookingArguments = {
  userId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;

  startDate: {
    min?: Date;
    max?: Date;
  };
  endDate: {
    min?: Date;
    max?: Date;
  };

  status: BookingStatusType;
  message: string;
};

const DEFAULT_VISIT_START_HOUR = 8;
const DEFAULT_VISIT_END_HOUR = 18;
const VISIT_SLOT_MINUTES = 60;

const isSameSlot = (left: Date, right: Date) =>
  left.getTime() === right.getTime();

const getDayBounds = (date: Date) => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return { dayStart, dayEnd };
};

const getAvailableTimesFromGrid = (grid: boolean[][], date: Date) => {
  const { dayStart } = getDayBounds(date);
  const dayOfWeek = dayStart.getDay(); // 0-6

  const availableSlots: Date[] = [];
  for (let hourIdx = 0; hourIdx < 10; hourIdx++) {
    if (grid[hourIdx][dayOfWeek]) {
      const start = new Date(dayStart);
      start.setHours(DEFAULT_VISIT_START_HOUR + hourIdx, 0, 0, 0);
      availableSlots.push(start);
    }
  }
  return availableSlots;
};

const getDefaultAvailabilityGrid = () => {
  const grid = Array.from({ length: 10 }, () => Array(7).fill(false));
  return grid;
};

const formatVisitDateTime = (date: Date) =>
  new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  }).format(date);

const notifyVisitBookingRecipients = async (
  facility: HousingFacilityType,
  booking: BookingType,
) => {
  const student = await User.findById(booking.userId).lean();
  const studentName = student
    ? [student.firstName, student.lastName].filter(Boolean).join(" ") ||
      "A student"
    : "A student";
  const visitTime = formatVisitDateTime(booking.startDate);
  const subject = "New ocular visit booking";
  const content = `${studentName} booked an ocular visit for ${facility.name} on ${visitTime}.`;
  const recipients = new Map<string, mongoose.Types.ObjectId>([
    [facility.landlordId.toString(), facility.landlordId],
  ]);

  for (const manager of facility.managers) {
    if (manager.permissions.manageBookings) {
      recipients.set(manager.userId.toString(), manager.userId);
    }
  }

  await Promise.all(
    [...recipients.values()].map((recipientId) =>
      sendNotification(recipientId, subject, content),
    ),
  );

  await sendNotification(
    booking.userId,
    "Ocular visit requested",
    `You successfully requested an ocular visit for ${facility.name} on ${visitTime}. Wait for the landlord approval before your visit is confirmed.`,
  );
};

const notifyVisitBookingApproved = async (booking: BookingType) => {
  const facility = await HousingFacility.findById(booking.facilityId).lean();
  const facilityName = facility?.name ?? "your selected dorm";
  const visitTime = formatVisitDateTime(booking.startDate);

  await sendNotification(
    booking.userId,
    "Ocular visit approved",
    `Your ocular visit request for ${facilityName} on ${visitTime} has been approved by the landlord.`,
  );
};

export const getAvailableVisitSlots = async (
  facilityId: mongoose.Types.ObjectId,
  date: Date,
  filters: QueryFilter<HousingFacilityType> = {},
) => {
  const facility = await HousingFacility.where(filters).findById(facilityId);
  if (!facility) throw new AppError(404, "Facility not found.");
  if (!facility.allowVisit) return [];

  const { dayStart, dayEnd } = getDayBounds(date);
  const availability = await VisitAvailability.findOne({
    landlordId: facility.landlordId,
  });
  const grid = availability?.grid ?? getDefaultAvailabilityGrid();
  const availableStarts = getAvailableTimesFromGrid(grid, date).filter(
    (start) => start > new Date(),
  );

  const bookedSlots = await VisitBooking.find({
    facilityId,
    status: { $ne: "cancelled" },
    startDate: { $gte: dayStart, $lte: dayEnd },
  }).select("startDate");

  return availableStarts.map((startDate) => {
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + VISIT_SLOT_MINUTES);

    return {
      startDate,
      endDate,
      available: !bookedSlots.some((booking) =>
        isSameSlot(booking.startDate, startDate),
      ),
    };
  });
};

export const createBooking = async (
  data: CreateBookingArguments,
  filters: QueryFilter<HousingFacilityType> = {},
) => {
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    throw new AppError(
      422,
      "Booking end date should not be before booking start date date.",
    );
  }
  if (data.startDate < new Date()) {
    throw new AppError(422, "Booking start date should not be in the past.");
  }

  const facility = await HousingFacility.where(filters).findById(
    data.facilityId,
  );
  if (!facility) throw new AppError(404, "Facility not found.");
  if (!facility.allowVisit)
    throw new AppError(422, "This facility is not accepting visits.");

  const availability = await VisitAvailability.findOne({
    landlordId: facility.landlordId,
  });
  const grid = availability?.grid ?? getDefaultAvailabilityGrid();
  const selectedSlotStart = getAvailableTimesFromGrid(
    grid,
    data.startDate,
  ).find((slotStart) => isSameSlot(slotStart, data.startDate));
  if (!selectedSlotStart) {
    throw new AppError(
      422,
      "Selected visit time is outside the available schedule.",
    );
  }
  const existingBooking = await VisitBooking.exists({
    facilityId: data.facilityId,
    status: { $ne: "cancelled" },
    startDate: data.startDate,
  });
  if (existingBooking) {
    throw new AppError(409, "Selected visit slot is no longer available.");
  }

  // TODO: When landlord approval is implemented, keep new bookings pending until approve/reject.
  // For now, pending bookings are considered accepted by the student calendar flow.
  const newBooking = new VisitBooking(data);
  const savedBooking = await newBooking.save();
  await notifyVisitBookingRecipients(facility, savedBooking);
  return savedBooking;
};

export const getBookings = async (
  query: Partial<GetBookingArguments>,
  filters: QueryFilter<BookingType>,
) => {
  return await VisitBooking.where(filters)
    .find(buildQuery<BookingType>(query))
    .populate("userId", "firstName lastName")
    .populate("facilityId", "name");
};

export const updateBookingStatus = async (
  bookingId: mongoose.Types.ObjectId,
  status: BookingStatusType,
  filters: QueryFilter<BookingType>,
) => {
  const booking = await VisitBooking.findOne(
    combineFilters(filters, { _id: bookingId }),
  );
  if (!booking) throw new AppError(404, "Booking not found.");

  if (booking.status !== "pending") {
    throw new AppError(400, "Booking has already been processed.");
  }

  booking.status = status;
  const savedBooking = await booking.save();

  if (status === "accepted") {
    await notifyVisitBookingApproved(savedBooking);
  }

  return savedBooking;
};

export const cancelBooking = async (bookingId: mongoose.Types.ObjectId) => {
  const booking = await VisitBooking.findById(bookingId);
  if (!booking) {
    throw new AppError(404, "Booking not found.");
  }
  if (booking.status !== "pending") {
    throw new AppError(422, "Only pending bookings can be cancelled.");
  }

  booking.status = "cancelled";
  return await booking.save();
};
