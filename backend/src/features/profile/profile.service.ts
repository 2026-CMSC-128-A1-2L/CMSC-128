import type mongoose from 'mongoose';
import { type ManagerType, User } from '../user/user.model';
import { HousingFacility, type HousingFacilityType } from '../facility/facility.model';
import { AppError } from '../../error';
import type { ProfileSchema } from 'shared';
import type z from 'zod';

type ProfileType = z.infer<typeof ProfileSchema>;

export const getProfile = async (userId: mongoose.Types.ObjectId) => {
  const user = (await User.findOne({
    _id: userId,
    userType: { $in: ['Manager', 'Landlord'] },
    status: 'verified',
  }).lean()) as ManagerType | null;

  if (!user) {
    throw new AppError(404, 'User not found');
  }
  
  if (user.userType === 'Manager') {
    const facilities = (await HousingFacility.find({
      managers: { $elemMatch: { userId } },
    })) as HousingFacilityType[];
    const leanFacilities = facilities.map((x) => ({ id: x._id, name: x.name }));

    const landlordIds = [...new Set(facilities.map((x) => x.landlordId.toString()))];
    const landlords = await User.find({ _id: { $in: landlordIds } }).lean();
    const employers = landlords.map((x) => ({
      id: x._id,
      firstName: x.firstName,
      middleName: x.middleName,
      lastName: x.lastName,
    }));

    const profile: ProfileType = {
      id: user._id,
      userType: user.userType,
      contact: user.contact,
      emails: user.emails,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      facilities: leanFacilities,
      employers,
    };

    return profile;
  } else if (user.userType === 'Landlord') {
    const facilities = (await HousingFacility.find({
      landlordId: userId,
    })) as HousingFacilityType[];
    const leanFacilities = facilities.map((x) => ({ id: x._id, name: x.name }));

    const managerIds: Set<mongoose.Types.ObjectId> = new Set();
    facilities.forEach((x) => {
      x.managers.forEach((y) => {
        managerIds.add(y.userId);
      });
    });

    const managers = await User.find({ _id: { $in: [...managerIds] } }).lean();
    const employees = managers.map((x) => ({
      id: x._id,
      firstName: x.firstName,
      middleName: x.middleName,
      lastName: x.lastName,
    }));

    const profile: ProfileType = {
      id: user._id,
      userType: user.userType,
      contact: user.contact,
      emails: user.emails,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      facilities: leanFacilities,
      employees,
    };

    return profile;
  }

  // This should be unreachable.
  throw new AppError(500, 'Internal Server Error');
};
