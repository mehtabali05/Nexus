import {api} from './api';
import { Entrepreneur, Investor } from '../types';

const UserService = {
  getEntrepreneurs: async (): Promise<Entrepreneur[]> => {
    const response = await api.get('/users/entrepreneurs');
    return response.data;
  },
  getInvestors: async (): Promise<Investor[]> => {
    const response = await api.get('/users/investors');
    return response.data;
  }
};

export default UserService;