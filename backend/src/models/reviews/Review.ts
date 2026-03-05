import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    StudentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },

    ListingID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Numeric rating (number)
    },

    description: {
      type: String, // Written review body
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const ReviewModel = mongoose.model('Review', reviewSchema);
