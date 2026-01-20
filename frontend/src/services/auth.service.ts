import { api } from './api';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: 'investor' | 'entrepreneur';
};

export const AuthService = {
  login: async (data: LoginPayload) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterPayload) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getMe() {
    const res = await api.get('/users/me');
    return res.data;
  },
  
  async updateMe(payload: any) {
    const res = await api.put('/users/me', payload);
    return res.data;
  }
};
