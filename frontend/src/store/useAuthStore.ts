import type { UserTypeType } from 'shared';
import { create } from 'zustand';
import { api } from '../service/axiosInstance';

type User = {
  _id: string;
  auth: {
    google: string[];
  };
  emails: string[];
  firstName: string;
  lastName: string;
  status: 'setup' | 'unverified' | 'verified' | 'inactive' | 'disabled';
  profilePicture?: string | null;
  userType?: UserTypeType;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  fetchMe: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get('/api/users/me');
      set({ user: data.data, isInitialized: true });
    } catch {
      set({ user: null, isInitialized: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      set({ user: null, isInitialized: true, isLoading: false });
    }
  },
}));
