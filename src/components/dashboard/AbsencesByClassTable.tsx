import React from 'react';
import Table from '../ui/Table';
import { Turma } from '../../types';

interface AbsenceData {
  turma: Turma;
  faltas: number;
}

interface AbsencesByClassTableProps {
  data: AbsenceData[];
  loading: boolean;
}

const AbsencesByClassTable: React.FC<AbsencesByClassTableProps> = ({ data, loading }) => {
  const columns = [
    {
      header: 'Turma',
      accessor: (item: AbsenceData) => item.turma.nome,
      sortable: true,
    },
    {
      header: 'Ano',
      accessor: (item: AbsenceData) => item.turma.ano,
    },
    {
      header: 'Período',
      accessor: (item: AbsenceData) => item.turma.periodo,
    },
    {
      header: 'Total de Faltas',
      accessor: 'faltas',
      sortable: true,
    },
    {
      header: 'Ações',
      accessor: (item: AbsenceData) => (
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-1 px-2">
            Ver Detalhes
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
        Faltas por Turma
      </div>
      <div className="p-4">
        <Table 
          columns={columns} 
          data={data} 
          keyExtractor={(item) => item.turma.id}
        />
      </div>
    </div>
  );
};

export default AbsencesByClassTable;