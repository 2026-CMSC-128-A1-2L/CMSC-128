import mongoose from "mongoose";

//Creates an object model for TransferRequest
const TransferRequestSchema = new mongoose.Schema({
  transferRequestID: { type: mongoose.Schema.Types.ObjectId, unique: true },
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

  description: {
    type:     String,
    required: false
  },

  dateAndTime: {
    type:    Date,
    default: Date.now
  }
});

export const TransferRequest = mongoose.model("TransferRequest", TransferRequestSchema);

