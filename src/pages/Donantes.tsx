import React, { useEffect, useState } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import { fetchAPI } from '../services/api'; // Tu función para hacer peticiones HTTP

const Donantes: React.FC = () => {
  const [donantes, setDonantes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonantes = async () => {
      try {
        const data = await fetchAPI('/donantes/sql', { method: 'GET' }); // Nuevo endpoint
        setDonantes(data);
      } catch (error) {
        console.error('Error al obtener donantes:', error);
      }
    };
    fetchDonantes();
  }, []);

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'direccion', header: 'Dirección' },
    { field: 'telefono', header: 'Teléfono' },
  ];

  return (
    <div>
      <h2>Lista de Donantes</h2>
      <DataTableComponent data={donantes} columns={columns} />
    </div>
  );
};

export default Donantes;