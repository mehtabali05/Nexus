import { api } from './api';

export type UserProfile = {
  bio?: string;
  history?: string;
  preferences?: Record<string, any>;
};

export const ProfileService = {
  getMyProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateMyProfile: async (profile: UserProfile) => {
    const response = await api.put('/users/me', profile);
    return response.data;
  },
};
