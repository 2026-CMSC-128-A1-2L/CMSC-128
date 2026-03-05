import mongoose from 'mongoose';

const HousingFacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  landlordID: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord', required: true }, // Interaction point: HAS relationship (landlord owns facility)
  managerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }, // reference to Manager
  location: {
    coordinates: {
      type: [Number], // [lat, long]
    },
    text: String, // location as text
  },
  type: { type: String, enum: ['on-campus', 'off-campus', 'partner housing'], required: true }, // Spec: Type (on-campus, off-campus, partner housing)
  capacity: { type: Number, required: true }, // Spec: Capacity of the housing facility
  documentUrls: [{ type: String }],
  isAcceptingApplications: { type: Boolean, default: false }, // overrides dates
  applicationOpenDate: { type: Date, required: false }, // Spec: start of the allowed application period
  applicationCloseDate: { type: Date, required: false }, // Spec: end of the allowed application period
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }], // array of listings
});

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
