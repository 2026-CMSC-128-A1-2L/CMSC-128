import mongoose from 'mongoose';

const ACTIVITY_TYPES = ['create-facility', 'update-facililty', 'delete-facility'];

const activitySchema = new mongoose.Schema(
  {
    ids: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
      required: true,
      default: [],
    },
    actionType: {
      type: String,
      enum: ACTIVITY_TYPES,
      required: true,
    },
  },
  { timestamps: true, discriminatorKey: 'actionType' },
);

const dataPath = activitySchema.path<mongoose.Schema.Types.Subdocument>('data');

dataPath.discriminator(
  'create-facility',
  new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    },
    { _id: false },
  ),
);

dataPath.discriminator(
  'update-facility',
  new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    },
    { _id: false },
  ),
);

dataPath.discriminator(
  'delete-facility',
  new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    },
    { _id: false },
  ),
);

export const Activity = mongoose.model('Activity', activitySchema);
