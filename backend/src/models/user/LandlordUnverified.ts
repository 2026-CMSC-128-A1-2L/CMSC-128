/*
ik looks very bloated sa attributes, applicants and payments seem useless
since need nila maverify para gamitin app, IDimage namention ko na medj similar sa ProfilePicture
pero ngayon ko lang napansin, ano pinagkaiba ng UserInformation sa Name, Contact, Email?
also need pa ba ng apps + payments yung unverified? di naman nila magagamit app until verified sila
*/

import mongoose from 'mongoose';

//Creates an object model for Sample
const landlordUnverifiedSchema = new mongoose.Schema({
  landlordUnverifiedID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Interaction point: IS-A User
    required: true,
  },

  userInformation: {
    type: String,
    required: false, // Submitted personal details
  },

  documentsUrl: {
    type: String,
    required: false, // Uploaded ID/supporting docs
  },

  verificationApplicationStatus: {
    type: String,
    enum: ['pending', 'rejected', 'approved'],
    default: 'pending',
  },
});

export const LandlordUnverified = mongoose.model('LandlordUnverified', landlordUnverifiedSchema);
