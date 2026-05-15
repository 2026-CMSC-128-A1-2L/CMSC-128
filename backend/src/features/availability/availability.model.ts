import mongoose from 'mongoose';

export type AvailabilityType = {
  landlordId: mongoose.Types.ObjectId;
  // 10x7 grid representing 8 AM to 5 PM (10 hours) for 7 days
  // grid[hourIndex][dayIndex] where hourIndex 0 is 8 AM and dayIndex 0 is Sunday
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
    collection: 'visitavailabilities' // Explicitly set as requested
  },
);

export const VisitAvailability = mongoose.model('VisitAvailability', availabilitySchema);
