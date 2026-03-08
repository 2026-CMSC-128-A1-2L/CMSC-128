import mongoose from 'mongoose';
import 'vitest';

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

interface CustomMatchers<R = unknown> {
  statusToBe(expected: number): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

export {};
