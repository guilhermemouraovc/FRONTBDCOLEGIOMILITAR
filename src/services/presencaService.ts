import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface Presenca {
  id_presenca: number;
  id_aluno: number;
  id_turma: number;
  data_aula: string;
  presente: boolean;
  nome_aluno?: string;
  nome_turma?: string;
}

export interface PresencaFormData {
  id_aluno: number;
  id_turma: number;
  data_aula: string;
  presente: boolean;
}

export const presencaService = {
  async listar() {
    const response = await axios.get<Presenca[]>(`${API_URL}/presenca`);
    return response.data;
  },

  async criar(data: PresencaFormData) {
    const response = await axios.post<Presenca>(`${API_URL}/presenca`, data);
    return response.data;
  },

  async atualizar(id: number, data: PresencaFormData) {
    const response = await axios.put<Presenca>(`${API_URL}/presenca/${id}`, data);
    return response.data;
  },

  async excluir(id: number) {
    await axios.delete(`${API_URL}/presenca/${id}`);
  },

  async listarAlunos() {
    const response = await axios.get<Array<{ id: number; nome: string }>>(`${API_URL}/alunos`);
    return response.data;
  },

  async listarTurmas() {
    const response = await axios.get<Array<{ id: number; nome: string }>>(`${API_URL}/turmas`);
    return response.data;
  }
}