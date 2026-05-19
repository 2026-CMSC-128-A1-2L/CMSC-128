import mongoose from 'mongoose';

const removalRequestSchema = new mongoose.Schema(
  {
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tenantDisplayName: { type: String, required: true },
    tenantEmail: { type: String, required: true },
    facilityName: { type: String, required: true },
    reasons: {
      backedOut: { type: Boolean, default: false },
      noDocuments: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      otherReason: { type: String },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true },
);

export const RemovalRequest = mongoose.model('RemovalRequest', removalRequestSchema);
