import mongoose from 'mongoose';

// Creates an object model for Manager
const managerSchema = new mongoose.Schema({

    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    landlord_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LandlordVerified', // employed by VerifiedLandlord
        required: true
    },

    // Points of interaction nito:
      //MANAGES    -> HousingFacility
      //CONVERSES  -> VerifiedStudent
      //REVIEWS    -> ApplicationForm (approve/reject student applications)
      //Confirms/rejects VisitBooking requests

}, { timestamps: true });

export const Manager = mongoose.model('Manager', managerSchema);