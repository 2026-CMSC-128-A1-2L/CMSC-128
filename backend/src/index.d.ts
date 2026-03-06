import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: mongoose.Types.ObjectId;
      firstName: string;
      middleName: string;
      lastName: string;
      userType:
        | 'Admin'
        | 'Student'
        | 'Manager'
        | 'Landlord'
        | 'UnverifiedStudent'
        | 'UnverifiedManager'
        | 'UnverifiedLandlord';
      birthDate?: Date;
      email: string;
      auth: {
        google?: string;
        password?: string;
      };
      isActive: boolean;
      lastLogin?: Date;
      profilePicture?: String;
      isVerified: boolean;
    }
  }
}

export {};
