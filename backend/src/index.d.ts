import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: mongoose.Types.ObjectId;
      firstName: string;
      middleName?: string | null;
      lastName: string;
      userType:
        | 'Admin'
        | 'Student'
        | 'Manager'
        | 'Landlord'
        | 'UnverifiedStudent'
        | 'UnverifiedManager'
        | 'UnverifiedLandlord';
      birthDate?: Date | null;
      email: string;
      auth: {
        google?: string | null;
        password?: string | null;
      };
      isActive: boolean;
      lastLogin?: Date | null;
      profilePicture?: string | null;
    }
  }
}

export {};
