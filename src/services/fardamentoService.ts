import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Fardamento {
  id_fardamento?: number;
  tipo: string;
  tamanho: string;
}

// Criar um novo fardamento
export const createFardamento = async (fardamentoData: Omit<Fardamento, 'id_fardamento'>) => {
  try {
    const response = await axios.post(`${API_URL}/fardamentos`, fardamentoData);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao criar fardamento:', error);
    return { status: 500, error: 'Erro ao criar fardamento' };
  }
};

// Buscar todos os fardamentos
export const getAllFardamentos = async () => {
  try {
    const response = await axios.get(`${API_URL}/fardamentos`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao buscar fardamentos:', error);
    return { status: 500, error: 'Erro ao buscar fardamentos' };
  }
};

// Buscar um fardamento específico
export const getFardamentoById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/fardamentos/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao buscar fardamento:', error);
    return { status: 500, error: 'Erro ao buscar fardamento' };
  }
};

// Atualizar um fardamento
export const updateFardamento = async (id: number, fardamentoData: Partial<Fardamento>) => {
  try {
    const response = await axios.put(`${API_URL}/fardamentos/${id}`, fardamentoData);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao atualizar fardamento:', error);
    return { status: 500, error: 'Erro ao atualizar fardamento' };
  }
};

// Deletar um fardamento
export const deleteFardamento = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/fardamentos/${id}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error('Erro ao deletar fardamento:', error);
    return { status: 500, error: 'Erro ao deletar fardamento' };
  }
}; 