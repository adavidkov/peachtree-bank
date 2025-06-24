import * as transactionRepo from '../repositories/transactionRepository';
import { CreateTransactionRequest, Transaction } from '../types';

export const getAllTransactions = (search?: string, sortBy?: string): Transaction[] => {
  let transactions = transactionRepo.getAllTransactions();
  
  if (search) {
    transactions = transactions.filter(t => 
      t.contractor.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (sortBy) {
    transactions.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'contractor':
          return a.contractor.localeCompare(b.contractor);
        default:
          return 0;
      }
    });
  }
  
  return transactions;
};

export const getTransactionById = (id: string): Transaction => {
  const transaction = transactionRepo.getTransactionById(id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transaction;
};

export const createTransaction = (data: CreateTransactionRequest): Transaction => {
  const transactionData = {
    ...data,
    date: new Date().toISOString().split('T')[0],
    status: 'sent' as const
  };
  return transactionRepo.createTransaction(transactionData);
};

export const updateTransactionStatus = (id: string, status: Transaction['status']): Transaction => {
  const transaction = transactionRepo.updateTransactionStatus(id, status);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transaction;
};