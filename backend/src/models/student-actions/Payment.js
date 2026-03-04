import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  PaymentID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  LeaseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental' },
  ManagerEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  StudentEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  DueDate: { type: Date },
  PaymentDate: { type: Date },
  Amount: { type: Number },
  ProofOfPayment: { type: String }, // URL or file path to the proof of payment
  Status: { type: String, enum: ['paid', 'pending', 'overdue'] }, 
  PaymentType: { type: String } // e.g., 'rent', 'deposit', 'utility'
});

export const Payment = mongoose.model('Payment', paymentSchema);
