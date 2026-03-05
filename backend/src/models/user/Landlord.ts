/*
basically user attributes + landlord attributes
and kung anoman connected sa landlord sa erd
akala ko landlord yung higher in command bat
manager maghihire ng landlord

inadd ko pala yung HousingFacility and ManagerID pala like macheck natin kung anong
facility yung kaya nila iedit and kung sino manager nila
she mongo on my db till i atlas
*/

import mongoose from 'mongoose';

//Creates an object model for Sample
const landlordSchema = new mongoose.Schema({
  landlordID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Interaction point: IS-A User
    required: true,
  },
  name: { type: String, required: true }, //user attributes
  profilePicture: { type: String, required: true }, //unsure paano istore yung image
  contact: { type: Number, required: true },
  email: { type: String, required: true },
});

export const Landlord = mongoose.model('Landlord', landlordSchema);
