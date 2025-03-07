import React, { useEffect, useState } from 'react';
import DataTableComponent from '../components/DataTableComponent';
import { beneficiarioService } from '../services/beneficiarioService';
import { Beneficiario } from '../types/types';

const Beneficiarios: React.FC = () => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);

  useEffect(() => {
    const fetchBeneficiarios = async () => {
      const data = await beneficiarioService.getAll();
      setBeneficiarios(data);
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