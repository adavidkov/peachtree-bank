import { Router } from 'express';
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus
} from '../controllers/transactionController';

const router = Router();

router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.get('/transactions/:id', getTransactionById);
router.patch('/transactions/:id/status', updateTransactionStatus);

export default router;