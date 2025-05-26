// Student Types
export interface Student {
  id: number;
  nome: string;
  matricula: string;
  dataNascimento: string;
  sexo: string;
  turma?: Turma;
  notas?: Grade[];
  presencas?: Presence[];
  fardamentos?: Uniform[];
}

// Teacher Types
export interface Teacher {
  id: number;
  nome: string;
  email: string;
  especialidade: string;
  disciplinas?: Subject[];
}

// Class Types
export interface Turma {
  id: number;
  nome: string;
  ano: number;
  periodo: string;
  alunos?: Student[];
  professores?: Teacher[];
}

// Subject Types
export interface Subject {
  id: number;
  nome: string;
  cargaHoraria: number;
  professor?: Teacher;
}

// Grade Types
export interface Grade {
  id: number;
  alunoId: number;
  disciplinaId: number;
  valor: number;
  tipo: string; // 'prova', 'trabalho', etc.
  data: string;
  observacao?: string;
}

// Presence Types
export interface Presence {
  id: number;
  alunoId: number;
  disciplinaId: number;
  data: string;
  presente: boolean;
  justificativa?: string;
}

// Uniform Types
export interface Uniform {
  id: number;
  alunoId: number;
  tipo: string;
  tamanho: string;
  dataEntrega: string;
  status: string; // 'entregue', 'pendente', etc.
}

// Club Types
export interface Club {
  id: number;
  nome: string;
  descricao: string;
  instrutor: string;
  alunos?: Student[];
}

// Enrollment Types
export interface Enrollment {
  id: number;
  alunoId: number;
  turmaId: number;
  dataMatricula: string;
  status: string; // 'ativa', 'trancada', etc.
}

// Guardian Types
export interface Guardian {
  id: number;
  nome: string;
  parentesco: string;
  telefone: string;
  email: string;
  alunoId: number;
}

// Dashboard Types
export interface DashboardMetrics {
  totalAlunos: number;
  totalProfessores: number;
  turmasAtivas: number;
  notasLancadas: number;
  presencasRegistradas: number;
  fardamentosEntregues: number;
}

// Auth Types
export interface User {
  id: number;
  username: string;
  nome: string;
  role: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}