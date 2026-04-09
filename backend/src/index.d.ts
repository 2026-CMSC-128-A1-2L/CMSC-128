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
      emails: string[];
      auth: {
        google: string[];
        password?: string | null;
      };
      isActive: boolean;
      profilePicture?: string | null;
    }
  }
}

interface CustomMatchers<R = unknown> {
  statusToBe(expected: number): R;
}

declare module 'vitest' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface Assertion<T = any> extends CustomMatchers<T> { }
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface AsymmetricMatchersContaining extends CustomMatchers { }
}

export { };
