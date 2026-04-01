import mongoose from 'mongoose';
import { Invite } from '../models/communication/Invite.js';
import { HousingFacility } from '../models/housing/HousingFacility.js';
import { User } from '../models/user/User.js';
import { AppError } from '../controllers/error.js';


export const inviteManager = async (
  landlordID: mongoose.Types.ObjectId,
  facilityID: mongoose.Types.ObjectId,
  email: string,
) => {

  // make sure the facility exists and belongs to this landlord
  const facility = await HousingFacility.findOne({ _id: facilityID, landlordID });
  if (!facility) {
    throw new AppError(404, 'Facility not found or you are not the landlord.');
  }

  // check no pending invite already exists for this email + facility
  const existing = await Invite.findOne({ email, facilityID, status: 'pending' });
  if (existing) {
    throw new AppError(409, 'A pending invite already exists for this user.');
  }

  // create the invite
  const invite = new Invite({ landlordID, facilityID, email });
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

  // assign them as manager of the facility
  await HousingFacility.findByIdAndUpdate(invite.facilityID, { managerID: userID });

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