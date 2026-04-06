import mongoose from 'mongoose';

// Transfer request flow:
// 1. Student (with contract-signed rental) requests a transfer
// 2. Manager approves the request
// 3. The student is only removed from their current unit when someone else takes it
// 4. Target unit is the one specified in the request
// TODO: Billing implications when a transfer occurs need to be defined.
const TransferRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

    // reason for transfer
    description: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const TransferRequest = mongoose.model('TransferRequest', TransferRequestSchema);
