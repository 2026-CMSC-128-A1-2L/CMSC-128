import mongoose from 'mongoose';

// activity schema
const activitySchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Interaction point: the user who triggered the activity
    actionType: {
      type: String,
      enum: [
        'login', // Spec: login activity log
        'application', // Spec: application activity log
        'approval', // Spec: approval activity log
        'rejection',
        'assignment', // Spec: assignment audit trail
        'update', // Spec: update activity log
        'payment',
        'report',
        'override', // Spec: admin override of room assignments
      ],
      required: true,
    },
    targetType: {
      type: String,
      enum: ['user', 'application', 'unit', 'facility', 'payment', 'report'],
      required: false, // Kung anong activity
    },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

export const Activity = mongoose.model('Activity', activitySchema);
