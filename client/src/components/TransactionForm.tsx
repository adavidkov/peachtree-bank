import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Grid,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Add } from '@mui/icons-material';
import { transactionAPI } from '../services/api';
import type { CreateTransactionData, Transaction } from '../types';

interface TransactionFormProps {
  onTransactionCreated: (transaction: Transaction) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionCreated }) => {
  const [amount, setAmount] = useState('');
  const [contractor, setContractor] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: CreateTransactionData = {
        amount: parseFloat(amount),
        contractor,
        description: description || undefined,
      };

      const transaction = await transactionAPI.create(data);
      onTransactionCreated(transaction);

      setAmount('');
      setContractor('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New Transaction
      </Typography>

      <Stack component="form" onSubmit={handleSubmit} spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              fullWidth
              inputProps={{ step: '0.01', min: '0' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Contractor"
              value={contractor}
              onChange={(e) => setContractor(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          startIcon={<Add />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Create Transaction
        </LoadingButton>
      </Stack>
    </Paper>
  );
};