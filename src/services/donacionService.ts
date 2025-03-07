import { fetchAPI } from './api';
import { Donacion } from '../types/types';

export const donacionService = {
    getAll: async (): Promise<Donacion[]> => {
      return await fetchAPI('/donaciones/sql');
    },
  
    
  };