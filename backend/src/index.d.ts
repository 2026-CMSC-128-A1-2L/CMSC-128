declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      userType: 'admin' | 'manager' | 'landlord' | 'student';
    }
  }
}

export {};
