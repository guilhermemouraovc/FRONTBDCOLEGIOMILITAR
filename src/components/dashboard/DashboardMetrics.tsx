import React from 'react';
import { 
  UsersIcon, 
  GraduationCapIcon, 
  ClipboardCheckIcon,
  CalendarIcon,
  ShirtIcon,
  Building2Icon
} from 'lucide-react';
import MetricCard from '../ui/MetricCard';
import { DashboardMetrics as DashboardMetricsType } from '../../types';

interface DashboardMetricsProps {
  metrics: DashboardMetricsType;
  loading: boolean;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg h-32 animate-pulse">
            <div className="h-full bg-primary/10"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Total de Alunos"
        value={metrics.totalAlunos}
        icon={UsersIcon}
        color="primary"
        trend={{ value: 5.2, isPositive: true }}
      />
      
      <MetricCard
        title="Total de Professores"
        value={metrics.totalProfessores}
        icon={GraduationCapIcon}
        color="secondary"
      />
      
      <MetricCard
        title="Turmas Ativas"
        value={metrics.turmasAtivas}
        icon={Building2Icon}
        color="accent"
      />
      
      <MetricCard
        title="Notas Lançadas"
        value={metrics.notasLancadas}
        icon={ClipboardCheckIcon}
        color="success"
        trend={{ value: 12.5, isPositive: true }}
      />
      
      <MetricCard
        title="Presenças Registradas"
        value={metrics.presencasRegistradas}
        icon={CalendarIcon}
        color="warning"
      />
      
      <MetricCard
        title="Fardamentos Entregues"
        value={metrics.fardamentosEntregues}
        icon={ShirtIcon}
        color="primary"
        trend={{ value: 3.8, isPositive: false }}
      />
    </div>
  );
};

export default DashboardMetrics;