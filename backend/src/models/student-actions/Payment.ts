import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Interaction point: PAYS relationship
  unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true }, // Interaction point: payment is for this unit
  billingPeriodStart: { type: Date, required: false }, // Spec: billing statement — start of covered period
  billingPeriodEnd: { type: Date, required: false }, // Spec: billing statement — end of covered period
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  dueDate: { type: Date },
  paymentDate: { type: Date },
  amount: { type: Number },

  // Spec: list of overdue or unpaid dormitory fees
  // Student: view billing and payment status
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'overdue', 'partially_paid'],
    default: 'unpaid',
  },
  proofOfPayment: { type: String }, // URL or file path to the proof of payment
  paymentType: { type: String }, // e.g., 'rent', 'deposit', 'utility'
});

export const Payment = mongoose.model('Payment', paymentSchema);
