import React, { useEffect, useState } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import { donacionService } from '../services/donacionService';

const Donaciones: React.FC = () => {
  const [donaciones, setDonaciones] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        const data = await donacionService.getAll();
        setDonaciones(data);
      } catch (error) {
        console.error('Error al obtener donaciones:', error);
      }
    };
    fetchDonaciones();
  }, []);

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'fecha', header: 'Fecha' },
    { field: 'donante_nombre', header: 'Donante' },
    { field: 'beneficiario_nombre', header: 'Beneficiario' },
  ];

  return (
    <div>
      <h2>Lista de Donaciones</h2>
      <DataTableComponent data={donaciones} columns={columns} />
    </div>
  );
};

export default Donaciones;