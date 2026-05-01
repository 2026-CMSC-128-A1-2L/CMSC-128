import mongoose from 'mongoose';
import crypto from 'node:crypto';
import { managerPermissionSchema, type ManagerPermissionType } from '../facility/facility.model.js';
import { fchown } from 'node:fs';

export type InviteType = {
  email: string;
  landlordId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  unitId?: mongoose.Types.ObjectId;
  permissions: ManagerPermissionType;
  token: string;
  inviteType: 'manager' | 'student';
  status: 'pending' | 'accepted' | 'declined';
  dateInvited: Date;
  dateAccepted?: Date;
  dateDeclined?: Date;
};

const inviteSchema = new mongoose.Schema<InviteType>({
  email: { type: String, required: true },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'HousingFacility', required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },

  inviteType: {
    type: String,
    enum: ['student', 'manager'],
    default: 'manager',
    required: true,
  },

  // permissions granted to the manager upon acceptance
  permissions: {
    type: managerPermissionSchema,
    //will be required if invite type is manager
    required: function () {
      return this.inviteType === 'manager';
    },
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
    required: true,
  },

  dateInvited: { type: Date, default: Date.now, required: true },
  dateAccepted: { type: Date },
  dateDeclined: { type: Date },
});

export const Invite = mongoose.model('Invite', inviteSchema);
