import axios from 'axios';
import { ApiResponse, PaginatedResponse } from '../types';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic GET method
export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await api.get<T>(endpoint);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {} as T,
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao buscar dados',
    };
  }
}

// Generic GET method with pagination
export async function fetchPaginatedData<T>(
  endpoint: string,
  page = 0,
  size = 10
): Promise<ApiResponse<PaginatedResponse<T>>> {
  try {
    const response = await api.get<PaginatedResponse<T>>(
      `${endpoint}?page=${page}&size=${size}`
    );
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 0,
        number: 0,
        first: true,
        last: true,
      },
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao buscar dados paginados',
    };
  }
}

// Generic POST method
export async function postData<T, R>(
  endpoint: string,
  data: T
): Promise<ApiResponse<R>> {
  try {
    const response = await api.post<R>(endpoint, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {} as R,
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao enviar dados',
    };
  }
}

// Generic PUT method
export async function updateData<T, R>(
  endpoint: string,
  id: number,
  data: T
): Promise<ApiResponse<R>> {
  try {
    const response = await api.put<R>(`${endpoint}/${id}`, data);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: {} as R,
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao atualizar dados',
    };
  }
}

// Generic DELETE method
export async function deleteData(
  endpoint: string,
  id: number
): Promise<ApiResponse<void>> {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return {
      data: undefined,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: undefined,
      status: error.response?.status || 500,
      error: error.response?.data?.message || 'Erro ao excluir dados',
    };
  }
}

export default api;