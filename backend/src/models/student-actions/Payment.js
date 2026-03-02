import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  PaymentID: { type: Number, unique: true },
  LeaseID: { type: Number, ref: 'Rental' },
  ManagerEmail: { type: String },
  StudentEmail: { type: String },
  DueDate: { type: Date },
  PaymentDate: { type: Date },
  Amount: { type: Number },
  ProofOfPayment: { type: String }, // URL or file path to the proof of payment
  Status: { type: String, enum: ['paid', 'pending', 'overdue'] }, 
  PaymentType: { type: String }
});

export const Payment = mongoose.model('Payment', paymentSchema);
