import mongoose from 'mongoose';
import { AppError } from '../../error';
import { HousingFacility, type ManagerPermissionType } from '../facility/facility.model';
import { User } from '../user/user.model';
import { Invite, type InviteType } from './invite.model';
import type { QueryFilter } from 'mongoose';

export const getInvites = async (filters: QueryFilter<InviteType>) => {
  return await Invite.find(filters).lean();
};

export const inviteManager = async (
  landlordId: mongoose.Types.ObjectId,
  facilityId: mongoose.Types.ObjectId,
  email: string,
  permissions: ManagerPermissionType,
) => {
  let newInvite: InviteType;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // make sure the facility exists and belongs to this landlord
    const facility = await HousingFacility.findOne({ _id: facilityId, landlordId }).session(
      session,
    );
    if (!facility) throw new AppError(404, 'Facility not found.');

    // check no pending invite already exists for this email + facility
    const existingInvite = await Invite.findOne({ email, facilityId, status: 'pending' }).session(
      session,
    );
    if (existingInvite) throw new AppError(409, 'A pending invite already exists for this user.');

    // create the invite with specified permissions
    const invite = new Invite({ landlordId, facilityId, email, permissions });
    newInvite = await invite.save({ session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  return newInvite;
};

export const acceptInvite = async (token: string, emails: string[]) => {
  const session = await mongoose.startSession();
  let updatedInvite: InviteType;
  try {
    session.startTransaction();

    const invite = await Invite.findOne({ token }).session(session);
    if (!invite) throw new AppError(404, 'Invite not found.');

    // make sure it's still pending
    if (invite.status !== 'pending')
      throw new AppError(400, 'Invite has already been accepted or declined.');

    // make sure the logged in user's email matches the invite
    if (!emails.includes(invite.email))
      throw new AppError(403, 'This invite was not sent to your account.');

    const user = await User.findOneAndUpdate(
      { emails: invite.email, status: { $ne: 'disabled' } },
      { status: 'verified' },
      { returnDocument: 'after' },
    ).session(session);
    if (!user) throw new AppError(403, 'This invite was not sent to your account.');

    await HousingFacility.findOneAndUpdate(
      { _id: invite.facilityId, status: 'approved' },
      {
        $push: {
          managers: {
            userId: user._id,
            permissions: invite.permissions,
          },
        },
      },
      { returnDocument: 'after' },
    ).session(session);

    invite.status = 'accepted';
    invite.dateAccepted = new Date();
    updatedInvite = await invite.save({ session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  return updatedInvite;
};

export const declineInvite = async (token: string, emails: string[]) => {
  const session = await mongoose.startSession();
  let updatedInvite: InviteType;
  try {
    session.startTransaction();

    const invite = await Invite.findOne({ token }).session(session);
    if (!invite) throw new AppError(404, 'Invite not found.');

    // make sure it's still pending
    if (invite.status !== 'pending')
      throw new AppError(400, 'Invite has already been accepted or declined.');

    // make sure the logged in user's email matches the invite
    if (!emails.includes(invite.email))
      throw new AppError(403, 'This invite was not sent to your account.');

    invite.status = 'declined';
    invite.dateDeclined = new Date();
    updatedInvite = await invite.save({ session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  return updatedInvite;
};
