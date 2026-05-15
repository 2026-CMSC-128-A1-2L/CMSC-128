import mongoose from 'mongoose';
import { AppError } from '../../error.js';
import { HousingFacility, type ManagerPermissionType } from '../facility/facility.model.js';
import { User } from '../user/user.model.js';
import { Invite, type InviteType } from './invite.model.js';
import type { QueryFilter } from 'mongoose';
import { getUserByEmail } from '../user/user.service.js';
import { Unit } from '../unit/unit.model.js';
import { Rental } from '../rental/rental.model.js';
import { combineFilters } from '../../middleware.js';

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

    // check if the email exists and does not belong to a manager account
    const existingUser = await getUserByEmail(email, session);
    if (existingUser && existingUser.userType !== 'Manager') {
      throw new AppError(422, 'Can only invite manager accounts.');
    }

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

    // User already exists at this point, but they could have made
    // the account after getting invited, and set the account to
    // not be a 'manager', so the `userType` check is still required.
    // Status cannot be 'disabled', other status except 'setup' is allowed
    // which is already covered by the `userType` check.
    const user = await User.findOneAndUpdate(
      { emails: invite.email, userType: 'Manager', status: { $ne: 'disabled' } },
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

// For facility invitation (legacy tenants already living in the building)
export const inviteStudent = async (
  landlordId: mongoose.Types.ObjectId,
  facilityId: mongoose.Types.ObjectId,
  unitId: mongoose.Types.ObjectId,
  email: string,
) => {
  let newInvite: InviteType;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const unit = await Unit.findOne({ _id: unitId, facilityId }).session(session);
    if (!unit) throw new AppError(404, 'Unit not found');

    const existingUser = await getUserByEmail(email, session);
    if (existingUser && existingUser.userType !== 'Student') {
      throw new AppError(422, 'Can only invite student accounts');
    }
    const existingInvite = await Invite.findOne({
      email,
      unitId,
      status: 'pending',
    }).session(session);

    if (existingInvite) throw new AppError(409, 'A pending invite already exists for this user.');

    // 7-day expiration from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create invite
    const invite = new Invite({
      landlordId,
      facilityId,
      unitId,
      email,
      inviteType: 'student',
      expiresAt,
    });

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

// Accept a student invite — creates an active Rental for a legacy tenant
export const acceptStudentInvite = async (token: string, emails: string[]) => {
  const session = await mongoose.startSession();
  let updatedInvite: InviteType;
  try {
    session.startTransaction();

    const invite = await Invite.findOne({ token }).session(session);
    if (!invite) throw new AppError(404, 'Invite not found.');

    // Must still be pending
    if (invite.status !== 'pending')
      throw new AppError(400, 'Invite has already been accepted or declined.');

    // Check expiration
    if (invite.expiresAt && invite.expiresAt < new Date())
      throw new AppError(410, 'This invite has expired.');

    // Must be a student invite
    if (invite.inviteType !== 'student')
      throw new AppError(400, 'This endpoint is only for student invites.');

    // Verify the logged-in user's email matches the invite
    if (!emails.includes(invite.email))
      throw new AppError(403, 'This invite was not sent to your account.');

    // Verify the user is a Student and not disabled
    const user = await User.findOne({
      emails: invite.email,
      userType: 'Student',
      status: { $ne: 'disabled' },
    }).session(session);
    if (!user) throw new AppError(403, 'This invite was not sent to your account.');

    // Validate the unit still exists and belongs to the correct facility
    const unit = await Unit.findOne({
      _id: invite.unitId,
      facilityId: invite.facilityId,
    }).session(session);
    if (!unit) throw new AppError(404, 'Unit not found.');

    // Capacity check
    if (unit.currentRentals.length >= unit.capacity)
      throw new AppError(400, 'Unit is already at full capacity.');

    // Duplicate rental check — prevent creating a second active rental for the same user + unit
    const existingRental = await Rental.findOne({
      userId: user._id,
      unitId: unit._id,
      status: 'active',
    }).session(session);
    if (existingRental) throw new AppError(409, 'You already have an active rental for this unit.');

    // Create active rental for the legacy tenant
    const rental = new Rental({
      userId: user._id,
      facilityId: invite.facilityId,
      unitId: unit._id,
      status: 'active',
    });
    const savedRental = await rental.save({ session });

    // Update the unit's currentRentals array
    unit.currentRentals.push(savedRental._id);
    await unit.save({ session });

    // Mark invite as accepted
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

// Decline a student invite
export const declineStudentInvite = async (token: string, emails: string[]) => {
  const session = await mongoose.startSession();
  let updatedInvite: InviteType;
  try {
    session.startTransaction();

    const invite = await Invite.findOne({ token }).session(session);
    if (!invite) throw new AppError(404, 'Invite not found.');

    // Must still be pending
    if (invite.status !== 'pending')
      throw new AppError(400, 'Invite has already been accepted or declined.');

    // Check expiration
    if (invite.expiresAt && invite.expiresAt < new Date())
      throw new AppError(410, 'This invite has expired.');

    // Must be a student invite
    if (invite.inviteType !== 'student')
      throw new AppError(400, 'This endpoint is only for student invites.');

    // Verify the logged-in user's email matches the invite
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
