import React, { useEffect, useState } from 'react';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import TopStudentsTable from '../components/dashboard/TopStudentsTable';
import AbsencesByClassTable from '../components/dashboard/AbsencesByClassTable';
import UniformsTable from '../components/dashboard/UniformsTable';
import ChartCard from '../components/ui/ChartCard';
import { 
  fetchDashboardMetrics,
  fetchTopStudents,
  fetchAbsencesByClass,
  fetchDeliveredUniforms,
  fetchPresenceStats,
  fetchGradeDistribution,
  fetchUniformSizeDistribution
} from '../services/dashboardService';
import { 
  DashboardMetrics as DashboardMetricsType,
  Student,
  Turma,
  Uniform
} from '../types';

// Mock data for initial render
const mockMetrics: DashboardMetricsType = {
  totalAlunos: 450,
  totalProfessores: 32,
  turmasAtivas: 15,
  notasLancadas: 1250,
  presencasRegistradas: 6780,
  fardamentosEntregues: 380
};

const mockStudents: Student[] = [
  { id: 1, nome: 'João Silva', matricula: '2023001', dataNascimento: '2010-05-15', sexo: 'M', turma: { id: 1, nome: '9º Ano A', ano: 9, periodo: 'Manhã' } },
  { id: 2, nome: 'Maria Oliveira', matricula: '2023002', dataNascimento: '2010-07-22', sexo: 'F', turma: { id: 1, nome: '9º Ano A', ano: 9, periodo: 'Manhã' } },
  { id: 3, nome: 'Pedro Santos', matricula: '2023003', dataNascimento: '2010-02-18', sexo: 'M', turma: { id: 2, nome: '9º Ano B', ano: 9, periodo: 'Tarde' } },
  { id: 4, nome: 'Ana Costa', matricula: '2023004', dataNascimento: '2010-11-05', sexo: 'F', turma: { id: 2, nome: '9º Ano B', ano: 9, periodo: 'Tarde' } },
  { id: 5, nome: 'Lucas Ferreira', matricula: '2023005', dataNascimento: '2010-09-30', sexo: 'M', turma: { id: 3, nome: '8º Ano A', ano: 8, periodo: 'Manhã' } },
];

const mockAbsencesByClass = [
  { turma: { id: 1, nome: '9º Ano A', ano: 9, periodo: 'Manhã' }, faltas: 45 },
  { turma: { id: 2, nome: '9º Ano B', ano: 9, periodo: 'Tarde' }, faltas: 52 },
  { turma: { id: 3, nome: '8º Ano A', ano: 8, periodo: 'Manhã' }, faltas: 38 },
  { turma: { id: 4, nome: '8º Ano B', ano: 8, periodo: 'Tarde' }, faltas: 61 },
  { turma: { id: 5, nome: '7º Ano A', ano: 7, periodo: 'Manhã' }, faltas: 29 },
];

const mockUniforms: Uniform[] = [
  { id: 1, alunoId: 1, tipo: 'Camiseta', tamanho: 'M', dataEntrega: '2023-02-10', status: 'entregue' },
  { id: 2, alunoId: 2, tipo: 'Calça', tamanho: 'P', dataEntrega: '2023-02-10', status: 'entregue' },
  { id: 3, alunoId: 3, tipo: 'Camiseta', tamanho: 'G', dataEntrega: '2023-02-15', status: 'entregue' },
  { id: 4, alunoId: 4, tipo: 'Calça', tamanho: 'M', dataEntrega: '2023-02-15', status: 'pendente' },
  { id: 5, alunoId: 5, tipo: 'Boina', tamanho: 'U', dataEntrega: '2023-02-20', status: 'entregue' },
];

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetricsType>(mockMetrics);
  const [topStudents, setTopStudents] = useState<Student[]>(mockStudents);
  const [absencesByClass, setAbsencesByClass] = useState(mockAbsencesByClass);
  const [uniforms, setUniforms] = useState<Uniform[]>(mockUniforms);
  const [loading, setLoading] = useState({
    metrics: true,
    students: true,
    absences: true,
    uniforms: true
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard metrics
        const metricsResponse = await fetchDashboardMetrics();
        if (metricsResponse.data) {
          setMetrics(metricsResponse.data);
        }
        setLoading(prev => ({ ...prev, metrics: false }));

        // Fetch top students
        const studentsResponse = await fetchTopStudents(5);
        if (studentsResponse.data) {
          setTopStudents(studentsResponse.data);
        }
        setLoading(prev => ({ ...prev, students: false }));

        // Fetch absences by class
        const absencesResponse = await fetchAbsencesByClass();
        if (absencesResponse.data) {
          setAbsencesByClass(absencesResponse.data);
        }
        setLoading(prev => ({ ...prev, absences: false }));

        // Fetch delivered uniforms
        const uniformsResponse = await fetchDeliveredUniforms(5);
        if (uniformsResponse.data) {
          setUniforms(uniformsResponse.data);
        }
        setLoading(prev => ({ ...prev, uniforms: false }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Use mock data on error
        setLoading({
          metrics: false,
          students: false,
          absences: false,
          uniforms: false
        });
      }
    };

    // Simulate API delay for demo purposes
    setTimeout(() => {
      fetchDashboardData();
    }, 1000);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-dark mb-2">Painel de Controle</h1>
        <p className="text-dark/70">
          Bem-vindo ao Sistema de Gestão do Colégio Militar. Visualize os principais indicadores abaixo.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="mb-8">
        <DashboardMetrics metrics={metrics} loading={loading.metrics} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Estatísticas de Presença">
          <div className="h-60 flex items-center justify-center bg-primary/5 rounded-md">
            <p className="text-dark/60">Gráfico de Estatísticas de Presença</p>
          </div>
        </ChartCard>

        <ChartCard title="Distribuição de Notas">
          <div className="h-60 flex items-center justify-center bg-primary/5 rounded-md">
            <p className="text-dark/60">Gráfico de Distribuição de Notas</p>
          </div>
        </ChartCard>
      </div>

      {/* Tables Section */}
      <div className="space-y-8">
        <TopStudentsTable students={topStudents} loading={loading.students} />
        
        <AbsencesByClassTable data={absencesByClass} loading={loading.absences} />
        
        <UniformsTable uniforms={uniforms} loading={loading.uniforms} />
      </div>
    </div>
  );
};

export default Dashboard;