import mongoose from 'mongoose';

// TODO: verify the flow and add attributes if needed.
const TransferRequestSchema = new mongoose.Schema(
  {
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

    // reason for transfer
    description: { type: String, required: false },
    status: { type: String, required: false },
  },
  { timestamps: true },
);

export const TransferRequest = mongoose.model('TransferRequest', TransferRequestSchema);
