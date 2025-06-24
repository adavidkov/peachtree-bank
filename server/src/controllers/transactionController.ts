import { Request, Response } from 'express';
import * as transactionService from '../services/transactionService';
import { CreateTransactionRequest, UpdateStatusRequest } from '../types';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { search, sortBy } = req.query;
    const transactions = transactionService.getAllTransactions(
      search as string,
      sortBy as string
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = transactionService.getTransactionById(id);
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: 'Transaction not found' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const data: CreateTransactionRequest = req.body;
    const transaction = transactionService.createTransaction(data);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create transaction' });
  }
};

export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status }: UpdateStatusRequest = req.body;
    const transaction = transactionService.updateTransactionStatus(id, status);
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: 'Transaction not found' });
  }
};