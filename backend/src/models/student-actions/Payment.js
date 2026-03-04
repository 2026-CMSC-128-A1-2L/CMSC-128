import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  PaymentID: { type: mongoose.Schema.Types.ObjectId, unique: true },

  studentID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'VerifiedStudent', // Interaction point: PAYS relationship
    required: true
  },

  unitID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'Unit',            // Interaction point: payment is for this unit
    required: true
  },

  billingPeriodStart: {
    type:     Date,
    required: false     // Spec: billing statement — start of covered period
  },

  billingPeriodEnd: {
    type:     Date,
    required: false     // Spec: billing statement — end of covered period
  },

  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  dueDate: { type: Date },
  paymentDate: { type: Date },
  amount: { type: Number },

  paymentStatus: {
    type:    String,
    enum:    ['unpaid', 'paid', 'overdue', 'partially_paid'],
    default: 'unpaid'
    // Spec: list of overdue or unpaid dormitory fees
    // Student: view billing and payment status
  },

  proofOfPayment: { type: String }, // URL or file path to the proof of payment

  paymentType: { type: String } // e.g., 'rent', 'deposit', 'utility'
});

export const Payment = mongoose.model('Payment', paymentSchema);
