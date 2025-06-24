import { Transaction } from '../types';

let transactions: Transaction[] = [
  {
    id: '1',
    amount: 1000,
    contractor: 'ABC Corp',
    date: '2024-01-15',
    status: 'sent',
    description: 'Payment for services'
  },
  {
    id: '2',
    amount: 500,
    contractor: 'XYZ Ltd',
    date: '2024-01-20',
    status: 'received',
    description: 'Invoice payment'
  }
];

//Used to increment the ID for new transactions
let nextId = 3;

export const getAllTransactions = (): Transaction[] => {
  return transactions;
};

export const getTransactionById = (id: string): Transaction | undefined => {
  return transactions.find(t => t.id === id);
};

export const createTransaction = (transactionData: Omit<Transaction, 'id'>): Transaction => {
  const transaction: Transaction = {
    id: nextId.toString(),
    ...transactionData
  };
  nextId++;
  transactions.push(transaction);
  return transaction;
};

export const updateTransactionStatus = (id: string, status: Transaction['status']): Transaction | undefined => {
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    transaction.status = status;
    return transaction;
  }
  return undefined;
};