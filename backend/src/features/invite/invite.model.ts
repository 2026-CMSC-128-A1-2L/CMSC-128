import mongoose from 'mongoose';
import crypto from 'crypto';

const inviteSchema = new mongoose.Schema({
  // manager id
  //
  // userId is used when the account exists already, email if not
  // after a manager creates an account with this email, the userId is set.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: String,

  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

  // permissions granted to the manager upon acceptance
  permissions: {
    manageBillings: { type: Boolean, default: false },
    manageApplications: { type: Boolean, default: false },
    manageListings: { type: Boolean, default: false },
  },

  // unique token for accepting the invite
  token: {
    type: String,
    required: true,
    default: () => crypto.randomBytes(32).toString('hex'),
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },

  dateInvited: { type: Date, default: Date.now },
  dateAccepted: { type: Date },
  dateDeclined: { type: Date },
});

export const Invite = mongoose.model('Invite', inviteSchema);
