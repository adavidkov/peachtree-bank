import { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { Close, Receipt } from '@mui/icons-material';
import { transactionAPI } from '../services/api';
import type { Transaction } from '../types';
import { getStatusColor } from '../utils/transactionUtils';

interface TransactionDetailsPanelProps {
  transactionId: string;
  onClose: () => void;
  onTransactionUpdate: (updatedTransaction: Transaction) => void;
}


export const TransactionDetailsPanel: React.FC<TransactionDetailsPanelProps> = ({ 
  transactionId, 
  onClose, 
  onTransactionUpdate 
}) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const data = await transactionAPI.getById(transactionId);
        setTransaction(data);
      } catch {
        setError('Transaction not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const handleStatusChange = async (newStatus: Transaction['status']) => {
    if (!transaction) return;
    
    try {
      const updatedTransaction = await transactionAPI.updateStatus(transaction.id, newStatus);
      setTransaction(updatedTransaction);
      onTransactionUpdate(updatedTransaction); // Update the specific transaction in the list
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={onClose}
      variant="persistent"
      sx={{
        width: 420,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 420,
          position: 'relative',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Receipt color="primary" />
          <Typography variant="h6" sx={{ flex: 1 }}>
            {transaction ? `${transaction.contractor} - $${transaction.amount.toFixed(2)}` : `Transaction ${transactionId}`}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        
        <Divider sx={{ mb: 3 }} />

        {/* Content */}
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error || !transaction ? (
          <Alert severity="error">{error || 'Transaction not found'}</Alert>
        ) : (
          <Stack spacing={3}>
            {/* Transaction Details Table */}
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold', border: 'none' }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <Typography variant="h6" color="primary">
                      ${transaction.amount.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold', border: 'none' }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {transaction.date}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold', border: 'none' }}>
                    To contractor
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    {transaction.contractor}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" sx={{ fontWeight: 'bold', border: 'none' }}>
                    State
                  </TableCell>
                  <TableCell sx={{ border: 'none' }}>
                    <Chip
                      label={transaction.status.toUpperCase()}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                {transaction.description && (
                  <TableRow>
                    <TableCell component="th" sx={{ fontWeight: 'bold', border: 'none' }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ border: 'none' }}>
                      {transaction.description}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Divider />

            {/* Status Change */}
            <FormControl fullWidth>
              <InputLabel>Change transaction state</InputLabel>
              <Select
                value={transaction.status}
                label="Change transaction state"
                onChange={(e) => handleStatusChange(e.target.value as Transaction['status'])}
              >
                <MenuItem value="sent">Sent</MenuItem>
                <MenuItem value="received">Received</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
};