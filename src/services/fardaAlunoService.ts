import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface FardaAluno {
  id_farda_aluno?: number;
  id_aluno: number;
  id_farda: number;
  data_entrega: string;
  aluno?: {
    nome: string;
  };
  fardamento?: {
    tipo: string;
    tamanho: string;
  };
}

// Criar uma nova entrega de farda
export const createFardaAluno = async (fardaAlunoData: Omit<FardaAluno, 'id_farda_aluno'>) => {
  try {
    const response = await axios.post(`${API_URL}/farda-alunos`, fardaAlunoData);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao criar entrega de farda:', error);
    return { status: 500, error: 'Erro ao criar entrega de farda' };
  }
};

// Buscar todas as entregas de farda
export const getAllFardasAlunos = async () => {
  try {
    const response = await axios.get(`${API_URL}/farda-alunos`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao buscar entregas de farda:', error);
    return { status: 500, error: 'Erro ao buscar entregas de farda' };
  }
};

// Buscar uma entrega de farda específica
export const getFardaAlunoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/farda-alunos/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao buscar entrega de farda:', error);
    return { status: 500, error: 'Erro ao buscar entrega de farda' };
  }
};

// Atualizar uma entrega de farda
export const updateFardaAluno = async (id: number, fardaAlunoData: Partial<FardaAluno>) => {
  try {
    const response = await axios.put(`${API_URL}/farda-alunos/${id}`, fardaAlunoData);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao atualizar entrega de farda:', error);
    return { status: 500, error: 'Erro ao atualizar entrega de farda' };
  }
};

// Deletar uma entrega de farda
export const deleteFardaAluno = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/farda-alunos/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao deletar entrega de farda:', error);
    return { status: 500, error: 'Erro ao deletar entrega de farda' };
  }
}; 