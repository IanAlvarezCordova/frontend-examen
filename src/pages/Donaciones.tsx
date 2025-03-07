import React, { useEffect, useState } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import { donacionService } from '../services/donacionService';
import { Donacion } from '../types/types';

const Donaciones: React.FC = () => {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);

  useEffect(() => {
    const fetchDonaciones = async () => {
      const data = await donacionService.getAll();
      setDonaciones(data);
    };
    fetchDonaciones();
  }, []);

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'fecha', header: 'Fecha' },
    { field: 'donante.nombre', header: 'Donante' },
    { field: 'beneficiario.nombre', header: 'Beneficiario' },
  ];

  return (
    <div>
      <h2>Lista de Donaciones</h2>
      <DataTableComponent data={donaciones} columns={columns} />
    </div>
  );
};

export default Donaciones;