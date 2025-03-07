import { fetchAPI } from './api';
import { Donante } from '../types/types';

export const donanteService = {
    getAll: async (): Promise<Donante[]> => {
        return await fetchAPI('/donantes/sql');
      },
    
      
};