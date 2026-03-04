import mongoose from 'mongoose';

// Creates an object model for Student
const studentSchema = new mongoose.Schema({

    userID: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

export const Student = mongoose.model('Student', managerSchema);

