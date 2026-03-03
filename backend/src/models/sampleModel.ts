/**
 * Sample Model
 * Defines the structure (schema) of a Sample document in MongoDB.
 * The model name "Sample" determines the collection name in MongoDB.
 */

import mongoose from 'mongoose';

// sampleSchema would be renamed to <entity>Schema
const sampleSchema = new mongoose.Schema(
  {
    //fields are just an example, change depending on the attributes of an entity
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }, // automatically adds createdAt and updatedAt
);

// "Sample" is the model name.
// "Sample" must be the same name as the collection in mongodb
module.exports = mongoose.model('Sample', sampleSchema);
