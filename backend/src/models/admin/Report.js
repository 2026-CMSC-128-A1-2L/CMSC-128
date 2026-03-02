import mongoose from 'mongoose';


//Schema Listing report
const listingReportSchema = new mongoose.Schema({
    // Assumed that Mongo will create Primary Key

    reportType: { type: String, required: true },

    ReportFlags: [String],                                  // Array of valid flags

    reportDescription: { type: String, required: true },
    reportEvidence: { type: String, required: true },       // Can be a link/picture?

    dateCreated: { type: Date, required: true },
    dateResolved: { type: Date, required: true },
    reporterID: {type: mongoose.Schema.Types.ObjectId, ref:'Users' , required: true},                       // Foreign key to reporting user
    listingID: {type: mongoose.Schema.Types.ObjectId, ref:'Listings' , required: true},                     // Forign key for housing reported (to change)

})

//Schema User report
const userReportSchema = new mongoose.Schema({
    // Assumed that Mongo will create Primary Key

    reportType: { type: String, required: true },

    ReportFlags: [String],                                  // Array of valid flags

    reportDescription: { type: String, required: true },
    reportEvidence: { type: String, required: true },       // Can be a link/picture?

    dateCreated: { type: Date, required: true },
    dateResolved: { type: Date, required: true },
    reporterID: {type: mongoose.Schema.Types.ObjectId, ref:'Users' , required: true},                   // Foreign key to reporting user
    userID: {type: mongoose.Schema.Types.ObjectId, ref:'Users' , required: true},                       // Foreign key for reported user


})


export const ListingReport = model('ListingReport', listingReportSchema);             
export const UserReport = model('UserReport', userReportSchema);
