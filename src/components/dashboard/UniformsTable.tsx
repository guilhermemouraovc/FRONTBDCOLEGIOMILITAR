import React from 'react';
import Table from '../ui/Table';
import { Uniform } from '../../types';

interface UniformsTableProps {
  uniforms: Uniform[];
  loading: boolean;
}

const UniformsTable: React.FC<UniformsTableProps> = ({ uniforms, loading }) => {
  const columns = [
    {
      header: 'Tipo',
      accessor: 'tipo',
      sortable: true,
    },
    {
      header: 'Tamanho',
      accessor: 'tamanho',
    },
    {
      header: 'Data de Entrega',
      accessor: (uniform: Uniform) => {
        return new Date(uniform.dataEntrega).toLocaleDateString('pt-BR');
      },
      sortable: true,
    },
    {
      header: 'Status',
      accessor: (uniform: Uniform) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          uniform.status === 'entregue' 
            ? 'bg-success/20 text-success' 
            : 'bg-warning/20 text-warning'
        }`}>
          {uniform.status.charAt(0).toUpperCase() + uniform.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Ações',
      accessor: (uniform: Uniform) => (
        <div className="flex items-center gap-2">
          <button className="btn-accent text-xs py-1 px-2">
            Detalhes
          </button>
        </div>
      ),
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md animate-pulse h-64">
        <div className="h-10 bg-primary/10 mb-4"></div>
        <div className="px-4 space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-8 bg-primary/5 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-primary/10 overflow-hidden">
      <div className="bg-primary text-light p-3 font-medium">
        Fardamentos Entregues
      </div>
      <div className="p-4">
        <Table 
          columns={columns} 
          data={uniforms} 
          keyExtractor={(uniform) => uniform.id}
          searchable
          searchKeys={['tipo', 'tamanho', 'status']}
        />
      </div>
    </div>
  );
};

export default UniformsTable;