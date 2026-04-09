import mongoose from "mongoose";

export const documentSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['accepted', 'rejected', 'pending'], default: 'pending', required: true },
  message: String,
  files: [String],
});
