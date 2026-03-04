import mongoose from 'mongoose';

// Creates an object model for Student
const studentSchema = new mongoose.Schema({

    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    student_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'StudentVerified',
        required: true
    },
}, { timestamps: true });

export const Student = mongoose.model('Student', managerSchema);

