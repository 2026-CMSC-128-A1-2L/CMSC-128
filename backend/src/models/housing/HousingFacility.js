import mongoose from 'mongoose';

const HousingFacilitySchema = new Schema({
    name: {
        type: String, 
        required: true 
    },
    location: { // format for GeoJSON
        type: {
            type: String, 
            default: 'Point' 
        },
        coordinates: {
            type: [Number], // [lat, long]
        }
    },
    type: {
        type: String 
    },
    documents_url: [
        { type: String }
    ],
    listings: [
        { 
            type: Schema.Types.ObjectId, // array of listing
            ref:'Listing'
        }
    ],
    listing_reports: [
        { 
            type: Schema.Types.ObjectId,   // array of lising report
            ref: 'ListingReport'    // can change depending on name of Report schema
        }
    ]
});

export const HousingFacility = mongoose.model('HousingFacility', HousingFacilitySchema);
