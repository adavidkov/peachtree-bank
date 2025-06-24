import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { AccountBalance, Logout } from '@mui/icons-material';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { TransactionDetailsPanel } from '../components/TransactionDetailsPanel';
import type { Transaction, User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const { transactionId } = useParams<{ transactionId?: string }>();
  const navigate = useNavigate();
  const [updatedTransaction, setUpdatedTransaction] = useState<Transaction | null>(null);
  const [newTransaction, setNewTransaction] = useState<Transaction | null>(null);

  const handleTransactionCreated = (transaction: Transaction) => {
    setNewTransaction(transaction);
    // Clear the new transaction after a short delay to reset the state
    setTimeout(() => setNewTransaction(null), 100);
  };

  const handleTransactionClick = (transaction: Transaction) => {
    navigate(`/dashboard/${transaction.id}`);
  };

  const handleCloseDetails = () => {
    navigate('/dashboard');
  };

  const handleTransactionUpdate = (transaction: Transaction) => {
    setUpdatedTransaction(transaction);
    // Clear the updated transaction after a short delay to reset the state
    setTimeout(() => setUpdatedTransaction(null), 100);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <AccountBalance sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Transaction Manager
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Welcome, <strong>{user.username}</strong>!
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={onLogout}
              color="inherit"
              size="small"
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Side - Form and Transaction List */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TransactionForm onTransactionCreated={handleTransactionCreated} />
          <TransactionList 
            onTransactionClick={handleTransactionClick}
            updatedTransaction={updatedTransaction}
            newTransaction={newTransaction}
          />
        </Box>

        {/* Right Side - Transaction Details Panel */}
        {transactionId && (
          <TransactionDetailsPanel
            transactionId={transactionId}
            onClose={handleCloseDetails}
            onTransactionUpdate={handleTransactionUpdate}
          />
        )}
      </Box>
    </Box>
  );
};