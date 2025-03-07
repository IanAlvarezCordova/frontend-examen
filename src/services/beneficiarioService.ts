import { fetchAPI } from './api';
import { Beneficiario } from '../types/types';

export const beneficiarioService = {
  getAll: async (): Promise<Beneficiario[]> => {
    return await fetchAPI('/beneficiarios');
  },

  getById: async (id: number): Promise<Beneficiario> => {
    return await fetchAPI(`/beneficiarios/${id}`);
  },
};