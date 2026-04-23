  import mongoose from 'mongoose';
import { defineLazy } from 'zod/v4/core/util.cjs';

  const billingSchema = new mongoose.Schema({
    
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    landLordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

    // Reference Ids
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    
    // Date related
    dueDate: { type: Date, required: true },
    paymentDate: { type: Date },
    
    // For Totals
    paidAmount: { type: Number },
    amount: { type: Number },

    // Cost break downs
    breakdown:{
      rent: {type: Number, default:0},
      utilities: {type: Number, default:0},
      misc: {type: Number, default:0},

    },

    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'overdue', 'partially_paid'],
      default: 'unpaid',
    },


    // Payment QR
    paymentQr: {
      file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
    },

    // URL or file path to the proof of payment
    proofOfPayment: {
      file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
      referenceNumber: {type:String},
      isVerified: { type: Boolean, default: false },
    },
    
    paymentMethod: {
      type: String,
      // TODO: Clarify with front end what the types of payment are
      enum:['bank_transfer','Gcash','in_person'],
    },

    //
    paymentType: { type: String }, // e.g., 'rent', 'deposit', 'utility'
  },
  {
    // So that create and update are auto managed
    timestamps: true,
  }
);

  export const Billing = mongoose.model('Billing', billingSchema);
