import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    actionType: {
      type: String, enum: [
        "create-facility",
        "update-facililty",
        "delete-facility",
      ], required: true
    },
  },
  { timestamps: true, discriminatorKey: 'actionType', _id: false },
);

const dataPath = activitySchema.path<mongoose.Schema.Types.Subdocument>('data');

datatypePath.discriminator(
  'create-facility',
  new mongoose.Schema(
    {
      facilityID: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    },
    { _id: false },
  ),
);

datatypePath.discriminator(
  'update-facility',
  new mongoose.Schema(
    {
      facilityID: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    },
    { _id: false },
  ),
);

datatypePath.discriminator(
  'delete-facility',
  new mongoose.Schema(
    {
      facilityID: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
    },
    { _id: false },
  ),
);

export const Activity = mongoose.model('Activity', activitySchema);
