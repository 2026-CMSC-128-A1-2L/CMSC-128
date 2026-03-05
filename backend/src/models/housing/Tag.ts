import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
  dataType: { type: String, required: true },
  name: { type: String, required: true },
});

export const Tag = mongoose.model('Tag', TagSchema);
