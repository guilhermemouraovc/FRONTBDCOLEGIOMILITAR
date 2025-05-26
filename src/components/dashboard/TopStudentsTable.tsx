import React from 'react';
import Table from '../ui/Table';
import { Student } from '../../types';

interface TopStudentsTableProps {
  students: Student[];
  loading: boolean;
}

const TopStudentsTable: React.FC<TopStudentsTableProps> = ({ students, loading }) => {
  const columns = [
    {
      header: 'Aluno',
      accessor: 'nome',
      sortable: true,
    },
    {
      header: 'Matrícula',
      accessor: 'matricula',
    },
    {
      header: 'Turma',
      accessor: (student: Student) => student.turma?.nome || '-',
    },
    {
      header: 'Média Geral',
      accessor: (student: Student) => {
        // Mock calculation since we don't have actual grades data
        return (9 + Math.random()).toFixed(1);
      },
      sortable: true,
    },
    {
      header: 'Ações',
      accessor: (student: Student) => (
        <div className="flex items-center gap-2">
          <button className="btn-primary text-xs py-1 px-2">
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
        Alunos com Melhor Desempenho
      </div>
      <div className="p-4">
        <Table 
          columns={columns} 
          data={students} 
          keyExtractor={(student) => student.id}
          searchable
          searchKeys={['nome', 'matricula']}
        />
      </div>
    </div>
  );
};

export default TopStudentsTable;