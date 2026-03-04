import mongoose from 'mongoose';

//Creates an object model for Sample
const applicationFormSchema = new mongoose.Schema({
  // Mongodb will make the primary key
  StudentEmail: {type: String, required: true},
  ListingId: {type: mongoose.Schema.ListingId},
  UnitId: {type: mongoose.Schema.UnitId},
  Status: {type: String},
  FormDocumentsUrl: [
    {type: String}
  ]
});

export const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);
