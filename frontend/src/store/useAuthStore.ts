import axios from 'axios';
import { create } from 'zustand';

type User = {
  auth: {
    google: string[];
  };
  emails: string[];
  firstName: string;
  lastName: string;
  status: 'setup' | 'unverified' | 'verified' | 'inactive' | 'disabled';
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  fetchMe: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  fetchMe: async () => {
    try {
      set({ isLoading: true });
      const { data } = await axios.get('/api/users/me');
      set({ user: data, isInitialized: true });
    } catch (error) {
      set({ user: null, isInitialized: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
