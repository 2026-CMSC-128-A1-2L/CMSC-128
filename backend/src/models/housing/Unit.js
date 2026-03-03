import mongoose from 'mongoose';

const UnitSchema = new Schema({
    room_number: { 
        type: Number, 
        required: true 
    },
    listing_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Listing', 
        required: true 
    },
    availability_status: { 
        type: String, 
        enum: ['Available', 'Occupied'] // add other status types
    },
    description: { 
        type: String 
    },
    current_occupancy: { 
        type: Number, 
        default: 0 
    },
    price: { 
        type: Number, 
        required: true 
    }
});

export const Unit = mongoose.model('Unit', UnitSchema);

