import React, { useEffect, useState } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import { fetchAPI } from '../services/api'; // Asegúrate de tener esta función para hacer peticiones HTTP

const Beneficiarios: React.FC = () => {
  const [beneficiarios, setBeneficiarios] = useState<any[]>([]);

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      try {
        const data = await fetchAPI('/beneficiarios/sql', { method: 'GET' });
        setBeneficiarios(data);
      } catch (error) {
        console.error('Error al obtener beneficiarios:', error);
      }
    };
    fetchBeneficiarios();
  }, []);

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'tipo', header: 'Tipo' },
    { field: 'direccion', header: 'Dirección' },
    { field: 'contacto', header: 'Contacto' },
  ];

  return (
    <div>
      <h2>Lista de Beneficiarios</h2>
      <DataTableComponent data={beneficiarios} columns={columns} />
    </div>
  );
};

export default Beneficiarios;