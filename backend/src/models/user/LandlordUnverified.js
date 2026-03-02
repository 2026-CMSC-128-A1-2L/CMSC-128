/*
ik looks very bloated sa attributes, applicants and payments seem useless
since need nila maverify para gamitin app, IDimage namention ko na medj similar sa ProfilePicture
pero ngayon ko lang napansin, ano pinagkaiba ng UserInformation sa Name, Contact, Email?
*/

import mongoose from 'mongoose';

//Creates an object model for Sample
const landlordUnverifiedSchema = new mongoose.Schema({
  LandlordID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  Name: { type: String, required: true },                       //user attributes
  ProfilePicture: { type: String, required: true },             //unsure paano istore yung image
  Contact: { type: Number, required: true },
  Email: { type: String, required: true },
  HousingFacility: { type: String, ref: 'HousingFacility' },    //landlord attributes
  ManagerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  Applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationForm' }],
  Payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  IDImage: { type: String },                                    //unverified landlord attributes
  DocumentsURL: { type: String },
  UserInformation: { type: String },
  VerificationApplicationStatus: { type: Number, default: 0 }   //0 = Pending, 1 = Approved, 2 = Rejected
  //need pa ng messages
});

export const LandlordUnverified = mongoose.model('LandlordUnverified', landlordUnverifiedSchema);
