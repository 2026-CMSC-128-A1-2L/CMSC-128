import mongoose from 'mongoose';

// Creates an object model for Student
const studentSchema = new mongoose.Schema(
  {
    studentID: { type: mongoose.Schema.Types.ObjectId, unique: true },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    studentNumber: {
      type: String,
      required: true,
      // Spec: identifies the student within the university system
    },

    degreeProgram: {
      type: String,
      required: false, // Degree program the student is enrolled in
    },
  },
  { timestamps: true },
);

export const Student = mongoose.model('Student', studentSchema);
