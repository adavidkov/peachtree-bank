export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface Transaction {
  id: string;
  amount: number;
  contractor: string;
  date: string;
  status: 'sent' | 'received' | 'paid';
  description?: string;
}

export interface CreateTransactionRequest {
  amount: number;
  contractor: string;
  description?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UpdateStatusRequest {
  status: 'sent' | 'received' | 'paid';
}