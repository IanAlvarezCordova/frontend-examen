import { fetchAPI } from './api';
import { Beneficiario } from '../types/types';

export const beneficiarioService = {
    getAll: async (): Promise<Beneficiario[]> => {
        return await fetchAPI('/beneficiarios/sql');
      },
    
    

  


};