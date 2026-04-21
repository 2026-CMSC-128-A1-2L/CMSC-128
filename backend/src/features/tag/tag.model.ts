import mongoose from 'mongoose';

const dataTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['enum', 'numeric', 'boolean'],
    },
  },
  { discriminatorKey: 'name', _id: false },
);

const tagSchema = new mongoose.Schema({
  dataType: { type: dataTypeSchema, required: true },
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  isRequired: { type: Boolean, required: true, default: false },
});

const datatypePath = tagSchema.path<mongoose.Schema.Types.Subdocument>('dataType');

datatypePath.discriminator(
  'enum',
  new mongoose.Schema(
    {
      values: { type: [String], required: true },
    },
    { _id: false },
  ),
);

datatypePath.discriminator(
  'numeric',
  new mongoose.Schema(
    {
      min: Number,
      max: Number,
    },
    { _id: false },
  ),
);

datatypePath.discriminator('boolean', new mongoose.Schema({}));

export const Tag = mongoose.model('Tag', tagSchema);
