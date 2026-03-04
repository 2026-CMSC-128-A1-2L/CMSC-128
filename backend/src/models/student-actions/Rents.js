import mongoose from 'mongoose';

const rentalSchema = new mongoose.Schema({
  LeaseID: { type: mongoose.Schema.Types.ObjectId, unique: true },
  ListingID: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  StudentEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  Status: { type: String, enum: ['active', 'inactive', 'pending', 'cancelled'] }, 
  ActualMoveInDate: { type: Date },
  ActualMoveOutDate: { type: Date },
  ExpectedMoveInDate: { type: Date },
  ExpectedMoveOutDate: { type: Date },
  Duration: { type: Number } // optional, can just be calculated from move-in and move-out dates
});


export const Rental = mongoose.model('Rental', rentalSchema);

