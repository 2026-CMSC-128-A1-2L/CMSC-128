import type mongoose from 'mongoose';
import { VisitAvailability } from './availability.model.js';

const dropLegacyFacilityIndex = async () => {
  try {
    await VisitAvailability.collection.dropIndex('facilityId_1');
  } catch (error) {
    const code = (error as { code?: number }).code;
    if (code !== 27) {
      throw error;
    }
  }
};

export const getLandlordAvailability = async (landlordId: mongoose.Types.ObjectId) => {
  await dropLegacyFacilityIndex();

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
  await dropLegacyFacilityIndex();

  return await VisitAvailability.findOneAndUpdate(
    { landlordId },
    { $set: { grid, landlordId } },
    { upsert: true, returnDocument: 'after' },
  );
};
