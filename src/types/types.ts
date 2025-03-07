export interface Donante {
    id: number;
    nombre: string;
    tipo: string;
    direccion: string;
    telefono: string;
  }
  
  export interface Beneficiario {
    id: number;
    nombre: string;
    tipo: string;
    direccion: string;
    contacto: string;
  }
  
  export interface Donacion {
    id: number;
    descripcion: string;
    fecha: string;
    donante: Donante;
    beneficiario: Beneficiario;
  }