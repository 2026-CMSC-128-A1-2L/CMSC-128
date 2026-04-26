import mongoose from 'mongoose';
import 'vitest';
import { DocumentType } from './features/document/document.model';

declare global {
  namespace Express {
    interface User {
      _id: mongoose.Types.ObjectId;
      firstName: string;
      middleName?: string | null;
      lastName: string;
      userType: 'Admin' | 'Student' | 'Manager' | 'Landlord';
      emails: string[];
      auth: {
        google: string[];
      };
      profilePicture?: string | null;
      status: 'setup' | 'unverified' | 'verified' | 'inactive' | 'disabled';
      documents: DocumentType[];
      verificationStatus: 'pending' | 'submitted' | 'rejected' | 'approved';
    }
  }
}

interface CustomMatchers<R = unknown> {
  statusToBe(expected: number): R;
}

declare module 'vitest' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface Assertion<T = any> extends CustomMatchers<T> {}
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
