import mongoose from 'mongoose';

export type AvailabilityType = {
  landlordId: mongoose.Types.ObjectId;
  grid: boolean[][];
};

const availabilitySchema = new mongoose.Schema<AvailabilityType>(
  {
    landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true, unique: true },
    grid: {
      type: [[Boolean]],
      default: () => Array.from({ length: 10 }, () => Array(7).fill(false)),
    },
  },
  {
    timestamps: true,
    collection: 'visitavailabilities'
  },
);

export const VisitAvailability = mongoose.model('VisitAvailability', availabilitySchema);
