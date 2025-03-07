import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

  // Métricas adicionales
  const donacionesUltimoMes = donaciones.filter((d) => {
    const fecha = new Date(d.fecha);
    const hoy = new Date();
    return fecha >= new Date(hoy.setMonth(hoy.getMonth() - 1));
  }).length;

  const donanteMasActivo = donantes.reduce((prev, curr) => {
    const donacionesPrev = donaciones.filter((d) => d.donante.id === prev.id).length;
    const donacionesCurr = donaciones.filter((d) => d.donante.id === curr.id).length;
    return donacionesCurr > donacionesPrev ? curr : prev;
  }, donantes[0]);

  // Gráfico 1: Distribución de donantes por tipo
  const chartDataDonantes = {
    labels: ['Supermercado', 'Restaurante', 'Particular'],
    datasets: [
      {
        label: 'Donantes por Tipo',
        data: [
          donantes.filter((d) => d.tipo === 'Supermercado').length,
          donantes.filter((d) => d.tipo === 'Restaurante').length,
          donantes.filter((d) => d.tipo === 'Particular').length,
        ],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      },
    ],
  };

  const meses = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString('default', { month: 'short' });
  }).reverse();

  const donacionesPorMes = meses.map((mes, i) => {
    const mesActual = new Date();
    mesActual.setMonth(mesActual.getMonth() - (5 - i));
    return donaciones.filter((d) => {
      const fechaDonacion = new Date(d.fecha);
      return (
        fechaDonacion.getMonth() === mesActual.getMonth() &&
        fechaDonacion.getFullYear() === mesActual.getFullYear()
      );
    }).length;
  });

  const chartDataDonaciones = {
    labels: meses,
    datasets: [
      {
        label: 'Donaciones por Mes',
        data: donacionesPorMes,
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
  };

  return (
    <div className="p-4">
      <h2>Dashboard de Donaciones</h2>
      <div className="grid">
        {/* Tarjetas de métricas */}
        <div className="col-12 md:col-3">
          <Card title="Total Donantes" subTitle={donantes.length.toString()} />
        </div>
        <div className="col-12 md:col-3">
          <Card title="Total Beneficiarios" subTitle={beneficiarios.length.toString()} />
        </div>
        <div className="col-12 md:col-3">
          <Card title="Total Donaciones" subTitle={donaciones.length.toString()} />
        </div>
        <div className="col-12 md:col-3">
          <Card
            title="Donaciones Último Mes"
            subTitle={donacionesUltimoMes.toString()}
          />
        </div>
        <div className="col-12 md:col-6">
          <Card
            title="Donante Más Activo"
            subTitle={donanteMasActivo ? `${donanteMasActivo.nombre} (${donaciones.filter((d) => d.donante.id === donanteMasActivo.id).length} donaciones)` : 'N/A'}
          />
        </div>

        {/* Gráficos */}
        <div className="col-12 md:col-6">
          <Card title="Distribución de Donantes por Tipo">
            <Chart type="bar" data={chartDataDonantes} options={chartOptions} style={{ height: '300px' }} />
          </Card>
        </div>
        <div className="col-12 md:col-6">
          <Card title="Donaciones en los Últimos 6 Meses">
            <Chart type="line" data={chartDataDonaciones} options={chartOptions} style={{ height: '300px' }} />
          </Card>
        </div>

        {/* Tabla de donaciones recientes */}
        <div className="col-12">
          <Card title="Donaciones Recientes">
            <DataTable
              value={donaciones.slice(0, 5)} // Últimas 5 donaciones
              paginator
              rows={5}
              responsiveLayout="scroll"
            >
              <Column field="id" header="ID" sortable />
              <Column field="descripcion" header="Descripción" sortable />
              <Column field="fecha" header="Fecha" sortable body={(rowData: Donacion) => new Date(rowData.fecha).toLocaleDateString()} />
              <Column field="donante.nombre" header="Donante" sortable />
              <Column field="beneficiario.nombre" header="Beneficiario" sortable />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;