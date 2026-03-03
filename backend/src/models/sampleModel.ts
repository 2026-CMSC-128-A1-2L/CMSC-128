import mongoose from 'mongoose';

//Creates an object model for Sample
const sampleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  quantity: { type: Number, required: true },
});

export const Sample = mongoose.model('Sample', sampleSchema);
