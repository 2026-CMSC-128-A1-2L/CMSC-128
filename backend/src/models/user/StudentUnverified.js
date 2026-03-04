import mongoose from 'mongoose';

// Creates an object model for studentUnverified
const studentUnverifiedSchema = new mongoose.Schema({

    userId: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',   // Interaction point: IS-A User
        required: true
    },

    student_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    documentsUrl: {
        type:     String,
        required: false     // Uploaded ID/supporting docs
    },

    userInformation: {
        type:     String,
        required: false     // Submitted personal details
    },

    idImage: {//URL reference to image
        type: String,
        required: true
    },

    verificationApplicationStatus: {
        type:    String,
        enum:    ['pending', 'rejected', 'verified'],
        default: 'pending'
    }

}, { timestamps: true });

export const studentUnverified = mongoose.model('studentUnverified', studentUnverifiedSchema);

