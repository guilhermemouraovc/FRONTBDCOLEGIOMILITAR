import { fetchData } from './api';
import { 
  DashboardMetrics, 
  Student, 
  Turma, 
  Presence,
  Uniform,
  ApiResponse
} from '../types';

// Fetch dashboard metrics
export const fetchDashboardMetrics = async (): Promise<ApiResponse<DashboardMetrics>> => {
  return await fetchData<DashboardMetrics>('/dashboard/metrics');
};

// Fetch top performing students
export const fetchTopStudents = async (limit = 5): Promise<ApiResponse<Student[]>> => {
  return await fetchData<Student[]>(`/dashboard/top-students?limit=${limit}`);
};

// Fetch absences by class
export const fetchAbsencesByClass = async (): Promise<ApiResponse<{ turma: Turma, faltas: number }[]>> => {
  return await fetchData<{ turma: Turma, faltas: number }[]>('/dashboard/absences-by-class');
};

// Fetch delivered uniforms
export const fetchDeliveredUniforms = async (limit = 10): Promise<ApiResponse<Uniform[]>> => {
  return await fetchData<Uniform[]>(`/dashboard/delivered-uniforms?limit=${limit}`);
};

// Fetch presence statistics
export const fetchPresenceStats = async (): Promise<ApiResponse<{ mes: string, presenca: number }[]>> => {
  return await fetchData<{ mes: string, presenca: number }[]>('/dashboard/presence-stats');
};

// Fetch grade distribution
export const fetchGradeDistribution = async (): Promise<ApiResponse<{ range: string, count: number }[]>> => {
  return await fetchData<{ range: string, count: number }[]>('/dashboard/grade-distribution');
};

// Fetch uniform distribution by size
export const fetchUniformSizeDistribution = async (): Promise<ApiResponse<{ tamanho: string, quantidade: number }[]>> => {
  return await fetchData<{ tamanho: string, quantidade: number }[]>('/dashboard/uniform-size-distribution');
};

// Fetch recent absences
export const fetchRecentAbsences = async (limit = 5): Promise<ApiResponse<Presence[]>> => {
  return await fetchData<Presence[]>(`/dashboard/recent-absences?limit=${limit}`);
};