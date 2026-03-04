import mongoose from 'mongoose';

// Creates an object model for VerifiedStudent
const studentVerifiedSchema = new mongoose.Schema({
    studentVerifiedID: { type: mongoose.Schema.Types.ObjectId, unique: true },
    userID: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',   // Interaction point: IS-A User
        required: true
    },

    studentID: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    accommodationHistory: {
        type:     Array,
        default:  []
        // Spec: maintain accommodation history per student
        // Each entry refs: { unitId, moveInDate, moveOutDate }
        // (see Rents.js for active tenancy)
    }


}, { timestamps: true });

export const studentVerified = mongoose.model('StudentVerified', studentVerifiedSchema);

