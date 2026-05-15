import type mongoose from 'mongoose';
import { VisitAvailability } from './availability.model.js';

export const getLandlordAvailability = async (landlordId: mongoose.Types.ObjectId) => {
  let availability = await VisitAvailability.findOne({ landlordId });

  if (!availability) {
    availability = new VisitAvailability({
      landlordId,
      grid: Array.from({ length: 10 }, () => Array(7).fill(false)),
    });
  }

  return availability;
};

export const updateLandlordAvailability = async (
  landlordId: mongoose.Types.ObjectId,
  grid: boolean[][],
) => {
  return await VisitAvailability.findOneAndUpdate(
    { landlordId },
    { grid },
    { upsert: true, new: true },
  );
};
