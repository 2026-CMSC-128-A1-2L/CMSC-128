import mongoose from 'mongoose';
import crypto from 'crypto';

const inviteSchema = new mongoose.Schema({
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },

  // store email instead of managerId
  email: { type: String, required: true },

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

  dateInvited:  { type: Date, default: Date.now },
  dateAccepted: { type: Date },
  dateDeclined: { type: Date },
});

export const Invite = mongoose.model('Invite', inviteSchema);