import mongoose from 'mongoose';
// source: https://mongoosejs.com/docs/guide.html
const { Schema, model } = mongoose;

const reviewSchema = new Schema({

    StudentEmail: {
        type:     Schema.Types.ObjectId,
        ref:      'VerifiedStudent',
        required: true
    },

    ListingId: {
        type:     Schema.Types.ObjectId,
        ref:      'Listing',
        required: true
    },

    rating: {
        type:     Number,
        required: true,
        min:      1,
        max:      5 // Numeric rating (number)
    },

    description: {
        type: String // Written review body
    },

    date: {
        type:    Date,
        default: Date.now
    }

}, { timestamps: true });

export default model('Review', reviewSchema);