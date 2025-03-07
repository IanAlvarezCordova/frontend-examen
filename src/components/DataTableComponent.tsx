import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface DataTableComponentProps {
  data: any[];
  columns: { field: string; header: string }[];
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ data, columns }) => {
  return (
    <DataTable value={data} paginator rows={10} responsiveLayout="scroll">
      {columns.map((col) => (
        <Column key={col.field} field={col.field} header={col.header} sortable />
      ))}
    </DataTable>
  );
};

export default DataTableComponent;