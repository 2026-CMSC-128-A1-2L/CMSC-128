/*
wala naman like new attributes ng verified landlord
so la ako madyadong inadd na bago, separate model
lang talaga to
*/
import mongoose from 'mongoose';

//Creates an object model for Sample
const landlordVerifiedSchema = new mongoose.Schema({
  landlordVerifiedID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  userID: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',   // Interaction point: IS-A User
    required: true
  },
});

export const LandlordVerified = mongoose.model('LandlordVerified', landlordVerifiedSchema);
