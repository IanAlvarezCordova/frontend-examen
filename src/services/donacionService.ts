import { fetchAPI } from './api';
import { Donante, Beneficiario } from '../types/types';

export interface Donacion {
  id: number;
  descripcion: string;
  fecha: string;
  donante: Donante;
  beneficiario: Beneficiario;
}

export const donacionService = {
  getAll: async (): Promise<Donacion[]> => {
    return await fetchAPI('/donaciones');
  },

  getById: async (id: number): Promise<Donacion> => {
    return await fetchAPI(`/donaciones/${id}`);
  },
};