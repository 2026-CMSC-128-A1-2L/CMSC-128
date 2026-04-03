import mongoose from 'mongoose';
import { Invite } from '../models/communication/Invite.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { Listing } from '../models/housing/Listing.js';
import { User } from '../models/user/User.js';
import { AppError } from '../controllers/error.js';

export type InviteManagerArguments = {
  landlordId: mongoose.Types.ObjectId;
  facilityId: mongoose.Types.ObjectId;
  email: string;
  permissions: {
    manageBillings: boolean;
    manageApplications: boolean;
    manageListings: boolean;
  };
};

export const inviteManager = async (data: InviteManagerArguments) => {
  const { landlordId, facilityId, email, permissions } = data;

  // make sure the facility exists and belongs to this landlord
  const facility = await HousingFacility.findOne({ _id: facilityId, landlordId });
  if (!facility) {
    throw new AppError(404, 'Facility not found or you are not the landlord.');
  }

  // check no pending invite already exists for this email + facility
  const existing = await Invite.findOne({ email, facilityId, status: 'pending' });
  if (existing) {
    throw new AppError(409, 'A pending invite already exists for this user.');
  }

  // create the invite with specified permissions
  const invite = new Invite({ landlordId, facilityId, email, permissions });
  return await invite.save();
};

export const acceptInvite = async (
  inviteID: mongoose.Types.ObjectId,
  userID: mongoose.Types.ObjectId,
) => {

  const invite = await Invite.findById(inviteID);
  if (!invite) {
    throw new AppError(404, 'Invite not found.');
  }

  // make sure it's still pending
  if (invite.status !== 'pending') {
    throw new AppError(400, 'Invite has already been accepted or declined.');
  }

  // make sure the logged in user's email matches the invite
  const user = await User.findById(userID);
  if (!user || user.email !== invite.email) {
    throw new AppError(403, 'This invite was not sent to your account.');
  }

  // upgrade user from UnverifiedManager → Manager
  await User.findByIdAndUpdate(userID, { userType: 'Manager' });

  // add them as manager of the facility with the invite's permissions
  await HousingFacility.findByIdAndUpdate(invite.facilityId, {
    $push: {
      managers: {
        managerId: userID,
        permissions: invite.permissions,
      },
    },
  });

  // cascade to all existing listings under this facility
  await Listing.updateMany(
    { housingId: invite.facilityId },
    {
      $push: {
        managers: {
          managerId: userID,
          permissions: invite.permissions,
        },
      },
    },
  );

  invite.status = 'accepted';
  invite.dateAccepted = new Date();
  await invite.save();

  return invite;
};



export const declineInvite = async (
    inviteID: mongoose.Types.ObjectId,
    userID: mongoose.Types.ObjectId,
  ) => {

    const invite = await Invite.findById(inviteID);
    if (!invite) {
      throw new AppError(404, 'Invite not found.');
    }
  
    // make sure it's still pending
    if (invite.status !== 'pending') {
      throw new AppError(400, 'Invite has already been accepted or declined.');
    }
  
    // make sure the logged in user's email matches the invite
    const user = await User.findById(userID);
    if (!user || user.email !== invite.email) {
      throw new AppError(403, 'This invite was not sent to your account.');
    }
  
    invite.status = 'declined';
    invite.dateDeclined = new Date();
    await invite.save();


    return invite;
};