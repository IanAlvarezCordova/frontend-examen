import { fetchAPI } from './api';
import { Donante } from '../types/types';

export const donanteService = {
  getAll: async (): Promise<Donante[]> => {
    return await fetchAPI('/donantes');
  },

  getById: async (id: number): Promise<Donante> => {
    return await fetchAPI(`/donantes/${id}`);
  },
};