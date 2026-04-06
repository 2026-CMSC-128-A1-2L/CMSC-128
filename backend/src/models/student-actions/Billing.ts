import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

  // Which facility this billing belongs to (for permission checks)
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

  dueDate: { type: Date },
  paymentDate: { type: Date },
  paidAmount: { type: Number },
  amount: { type: Number },

  // 'Unpaid' is when `paymentDate` is undefined
  // 'paid' is when `paymentDate` <= `dueDate`
  // 'overdue' is when `paymentDate` <= `dueDate`
  // 'partially_paid' is when `paidAmount` <= `amount`
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'overdue', 'partially_paid'],
    default: 'unpaid',
  },

  // URL or file path to the proof of payment
  proofOfPayment: {
    file: { type: String, ref: 'File', required: true },
    isVerified: { type: Boolean, default: false },
  },
  paymentType: { type: String }, // e.g., 'rent', 'deposit', 'utility'
});

export const Billing = mongoose.model('Billing', billingSchema);
