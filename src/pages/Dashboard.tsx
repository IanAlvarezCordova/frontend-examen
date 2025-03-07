import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { donanteService } from '../services/donanteService';
import { beneficiarioService } from '../services/beneficiarioService';
import { donacionService } from '../services/donacionService';
import { Beneficiario, Donacion, Donante } from '../types/types';

const Dashboard: React.FC = () => {
  const [donantes, setDonantes] = useState<Donante[]>([]);
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const donantesData = await donanteService.getAll();
      const beneficiariosData = await beneficiarioService.getAll();
      const donacionesData = await donacionService.getAll();
      setDonantes(donantesData);
      setBeneficiarios(beneficiariosData);
      setDonaciones(donacionesData);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['Supermercado', 'Restaurante', 'Particular'],
    datasets: [
      {
        label: 'Donaciones por Tipo de Donante',
        data: [
          donantes.filter((d) => d.tipo === 'Supermercado').length,
          donantes.filter((d) => d.tipo === 'Restaurante').length,
          donantes.filter((d) => d.tipo === 'Particular').length,
        ],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
  };

  return (
    <div>
      <h2>Dashboard de Donaciones</h2>
      <div className="grid">
        <div className="col-12 md:col-4">
          <Card title="Total Donantes" subTitle={donantes.length.toString()} />
        </div>
        <div className="col-12 md:col-4">
          <Card title="Total Beneficiarios" subTitle={beneficiarios.length.toString()} />
        </div>
        <div className="col-12 md:col-4">
          <Card title="Total Donaciones" subTitle={donaciones.length.toString()} />
        </div>
        <div className="col-12">
          <Card title="Distribución de Donantes por Tipo">
            <Chart type="bar" data={chartData} options={chartOptions} style={{ height: '300px' }} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;