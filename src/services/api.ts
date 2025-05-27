import axios from 'axios';
import { ApiResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

export default api;

// CRUD simplificado
export const crud = {
  list: async <T>(endpoint: string) => {
    const response = await api.get<T[]>(endpoint);
    return response.data;
  },
  get: async <T>(endpoint: string, id: number) => {
    const response = await api.get<T>(`${endpoint}/${id}`);
    return response.data;
  },
  create: async <T>(endpoint: string, data: any) => {
    const response = await api.post<T>(endpoint, data);
    return response.data;
  },
  update: async <T>(endpoint: string, id: number, data: any) => {
    const response = await api.put<T>(`${endpoint}/${id}`, data);
    return response.data;
  },
  delete: async (endpoint: string, id: number) => {
    await api.delete(`${endpoint}/${id}`);
  }
};

// 🔥 Função fetchData exportada para dashboardService.ts
export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await api.get<T>(endpoint);
    return {
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      data: {} as T,
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao buscar dados'
    };
  }
}

// 🔥 Função postData exportada para authService.ts
export async function postData<T, U>(endpoint: string, data: T): Promise<ApiResponse<U>> {
  try {
    const response = await api.post<U>(endpoint, data);
    return {
      data: response.data,
      status: response.status
    };
  } catch (error: any) {
    return {
      data: {} as U,
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao enviar dados'
    };
  }
}
