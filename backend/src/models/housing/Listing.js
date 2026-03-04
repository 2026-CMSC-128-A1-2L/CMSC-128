import mongoose from 'mongoose';

const ListingSchema = new Schema({
    facility_id: { 
        type: Schema.Types.ObjectId,    // reference to parent housing
        ref: 'HousingFacility', 
        required: true 
    },
    room_type: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    is_private: { 
        type: Boolean, 
        default: true 
    },
    allow_visit: { 
        type: Boolean, 
        default: false 
    },
    allow_transfer: { 
        type: Boolean, 
        default: false 
    },
    description: { 
        type: String 
    },
    media_urls: [
        { type: String }
    ],
    units: [
        { type: Number } // array of room numbers
    ], 
    tags: [     // can use embedded instead of reference type
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Tag' 
        }
    ]
});

export const Listing = mongoose.model('Listing', ListingSchema);
