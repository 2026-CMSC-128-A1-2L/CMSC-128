import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  unitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

  // Who the bill is paid to.
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },

  // Start of covered period
  billingPeriodStart: { type: Date, required: false },

  // End of covered period
  billingPeriodEnd: { type: Date, required: false },

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

  // TODO: change to file
  //
  // URL or file path to the proof of payment
  proofOfPayment: { type: String },
  paymentType: { type: String }, // e.g., 'rent', 'deposit', 'utility'
});

export const Payment = mongoose.model('Payment', paymentSchema);
