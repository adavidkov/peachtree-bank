import axios from 'axios';
import type { LoginData, RegisterData, CreateTransactionData, Transaction, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: async (credentials: LoginData): Promise<{ user: User }> => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  
  register: async (userData: RegisterData): Promise<{ user: User }> => {
    const response = await api.post('/register', userData);
    return response.data;
  },
};

export const transactionAPI = {
  getAll: async (search?: string, sortBy?: string): Promise<Transaction[]> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);
    
    const response = await api.get(`/transactions?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  create: async (data: CreateTransactionData): Promise<Transaction> => {
    const response = await api.post('/transactions', data);
    return response.data;
  },

  updateStatus: async (id: string, status: Transaction['status']): Promise<Transaction> => {
    const response = await api.patch(`/transactions/${id}/status`, { status });
    return response.data;
  },
};