import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'],
  credentials: true
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', transactionRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Transaction Manager API is running' });
});

export default app;