/*
wala naman like new attributes ng verified landlord
so la ako madyadong inadd na bago, separate model
lang talaga to
*/
import mongoose from 'mongoose';

//Creates an object model for Sample
const landlordVerifiedSchema = new mongoose.Schema({
  LandlordID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  Name: { type: String, required: true },                       //user attributes
  ProfilePicture: { type: String, required: true },             //unsure paano istore yung image
  Contact: { type: Number, required: true },
  Email: { type: String, required: true },
  HousingFacility: { type: String, ref: 'HousingFacility' },    //landlord attributes
  ManagerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
  Applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ApplicationForm' }],
  Payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }]
  //need pa ng messages
});

export const LandlordVerified = mongoose.model('LandlordVerified', landlordVerifiedSchema);
