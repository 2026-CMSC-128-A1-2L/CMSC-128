import mongoose from 'mongoose';

//Creates an object model for TransferRequest
const TransferRequestSchema = new mongoose.Schema(
  {
    studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    description: { type: String, required: false }, // reason for transfer?
  },
  { timestamps: true },
);

export const TransferRequest = mongoose.model('TransferRequest', TransferRequestSchema);
