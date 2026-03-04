import mongoose from 'mongoose';

// Creates an object model for VerifiedStudent
const studentVerifiedSchema = new mongoose.Schema({

    student_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    gmail: {//student information are not needed when gmail is present
        type: String,
        required: true
    },

    studentNumber: {//for approval, not in ERD 
        type: String,
        required: true
    },

    bookmarks: [{ //bookmarks of housing facilities
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HousingFacility'
    }],

//Some interactions have their own Schema
/*
student pay manager
student converses manager
student books housing facility
student rents unit
student reviews unit
*/

}, { timestamps: true });

export const studentVerified = mongoose.model('StudentVerified', studentVerifiedSchema);

