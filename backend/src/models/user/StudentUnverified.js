import mongoose from 'mongoose';

// Creates an object model for UnverifiedStudent
const unverifiedStudentSchema = new mongoose.Schema({

    student_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    Documents: {//for approval, was url in erd but turned to object id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Documents',
        required: true
    },

    UserInformation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInformation',
        required: true
    },

    IdImage: {//URL reference to image
        type: String,
        required: true
    },

    VerificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    },

//Does not have any interactions

}, { timestamps: true });

export const unverifiedStudent = mongoose.model('unverifiedStudent', unverifiedStudentSchema);
