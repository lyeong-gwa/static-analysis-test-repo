import apiClient from './client';
import { LoginRequest, SignupRequest, User } from '../types';

interface AuthResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/login', data);
    return response.data;
  },

  signup: async (data: SignupRequest): Promise<{ message: string; user: User }> => {
    const response = await apiClient.post('/api/auth/signup', data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/api/auth/profile');
    return response.data;
  },
};
