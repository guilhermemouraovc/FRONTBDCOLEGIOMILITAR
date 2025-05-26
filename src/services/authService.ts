import api, { postData } from './api';
import { LoginCredentials, User, ApiResponse } from '../types';

// Mock user for development
const mockUser: User = {
  id: 1,
  username: 'admin',
  nome: 'Administrador',
  role: 'ADMIN',
  token: 'mock-jwt-token'
};

// Login user
export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse<User>> => {
  // Check for mock credentials
  if (credentials.username === 'admin' && credentials.password === 'admin123') {
    localStorage.setItem('authToken', mockUser.token);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return {
      data: mockUser,
      status: 200
    };
  }
  
  // If not mock credentials, try real API
  const response = await postData<LoginCredentials, User>(
    '/auth/login',
    credentials
  );
  
  if (response.data?.token) {
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  
  return response;
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

// Check if user token is valid
export const validateToken = async (): Promise<boolean> => {
  try {
    // For mock token, always return true
    const token = localStorage.getItem('authToken');
    if (token === 'mock-jwt-token') {
      return true;
    }
    
    // For real token, validate with backend
    await api.get('/auth/validate');
    return true;
  } catch (error) {
    logout();
    return false;
  }
};