import mongoose from "mongoose";

//Creates an object model for Sample
const sampleSchema = new mongoose.Schema({
  StudentEmail: { type: String, required: true },
  UnitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
  description: { type: String },
  DateAndTime: { type: Date },
});

export const Sample = mongoose.model("Sample", sampleSchema);
