import mongoose from "mongoose";

const administratorSchema = new mongoose.Schema(
  {
    administratorID: { type: mongoose.Schema.Types.ObjectId, unique: true },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Administrator = mongoose.model(
  "Administrator",
  administratorSchema,
);

