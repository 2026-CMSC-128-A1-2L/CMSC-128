/*
basically user attributes + landlord attributes
and kung anoman connected sa landlord sa erd
akala ko landlord yung higher in command bat
manager maghihire ng landlord
she mongo on my db till i atlas
*/

import mongoose from 'mongoose';

//Creates an object model for Sample
const landlordSchema = new mongoose.Schema({
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

export const Landlord = mongoose.model('Landlord', landlordSchema);
