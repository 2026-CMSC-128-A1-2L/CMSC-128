import { api } from './axiosInstance';

export type TestLoginBody = {
  email: string;
};

export type TestRegisterBody = Record<string, unknown>;

export const AuthService = {
  startGoogleLogin() {
    window.location.href = '/api/auth/google';
  },

  async logout() {
    await api.post('/api/auth/logout');
  },

  async testRegister(body: TestRegisterBody) {
    try {
      const response = await api.post('/api/auth/test/register', body);
      return response.data;
    } catch (error) {
      console.error('Error registering test user:', error);
      throw error;
    }
  },

  async testLogin(body: TestLoginBody) {
    try {
      const response = await api.post('/api/auth/test/login', body);
      return response.data;
    } catch (error) {
      console.error('Error logging in test user:', error);
      throw error;
    }
  },
};
