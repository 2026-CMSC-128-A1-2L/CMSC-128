import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  LeaseID: { type: Number, unique: true },
  ListingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  Email: { type: String, ref: 'Student' },
  Status: { type: String, enum: ['active', 'inactive', 'pending', 'cancelled'] }, 
  ActualMoveInDate: { type: Date },
  ActualMoveOutDate: { type: Date },
  ExpectedMoveInDate: { type: Date },
  ExpectedMoveOutDate: { type: Date },
  Duration: { type: Number }
});


export const Rental = mongoose.model('Rental', rentalSchema);
