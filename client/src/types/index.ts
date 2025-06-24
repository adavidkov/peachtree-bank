export interface Transaction {
  id: string;
  amount: number;
  contractor: string;
  date: string;
  status: 'sent' | 'received' | 'paid';
  description?: string;
}

export interface User {
  id: string;
  username: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface CreateTransactionData {
  amount: number;
  contractor: string;
  description?: string;
}