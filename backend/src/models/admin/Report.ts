import mongoose from "mongoose";

//Schema Listing report
const listingReportSchema = new mongoose.Schema({
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  reporterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Interaction point: the user who triggered the activity
    required: true,
  },

  facilityID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HousingFacility",
    required: false,
    // Spec: many reports are scoped to a specific dormitory/facility
  },

  reportType: {
    type: String,
    enum: [
      "occupancy_rate", // Spec: list of all dormitories with occupancy rates
      "available_vs_occupied", // Spec: available vs occupied rooms per dormitory
      "students_housed", // Spec: students currently housed per dormitory
      "waitlist", // Spec: students on waiting list
      "accommodation_history", // Spec: accommodation history of a given student
      "revenue_summary", // Spec: revenue summary per dormitory (if billing is implemented)
      "overdue_payments", // Spec: list of overdue or unpaid dormitory fees
      "user", // General user misconduct report
      "listing", // General listing/facility issue report
    ],
    required: true,
  },

  reportDescription: { type: String, required: true },
  reportEvidence: { type: String, required: true }, // Can be a link/picture?

  dateCreated: { type: Date, required: true },
  dateResolved: { type: Date, required: true },
  listingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listings",
    required: true,
  }, // Forign key for housing reported (to change)
});

//Schema User report
const userReportSchema = new mongoose.Schema({
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  reporterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Interaction point: the user who triggered the activity
    required: true,
  },

  reportType: {
    type: String,
    enum: [
      "occupancy_rate", // Spec: list of all dormitories with occupancy rates
      "available_vs_occupied", // Spec: available vs occupied rooms per dormitory
      "students_housed", // Spec: students currently housed per dormitory
      "waitlist", // Spec: students on waiting list
      "accommodation_history", // Spec: accommodation history of a given student
      "revenue_summary", // Spec: revenue summary per dormitory (if billing is implemented)
      "overdue_payments", // Spec: list of overdue or unpaid dormitory fees
      "user", // General user misconduct report
      "listing", // General listing/facility issue report
    ],
    required: true,
  },

  reportDescription: { type: String, required: true },
  reportEvidence: { type: String, required: true }, // Can be a link/picture?

  dateCreated: { type: Date, required: true },
  dateResolved: { type: Date, required: true },
});

export const ListingReport = mongoose.model(
  "ListingReport",
  listingReportSchema,
);
export const UserReport = mongoose.model("UserReport", userReportSchema);
