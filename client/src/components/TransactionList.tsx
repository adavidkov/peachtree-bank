import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { transactionAPI } from '../services/api';
import type { Transaction } from '../types';
import { getStatusColor } from '../utils/transactionUtils';

interface TransactionListProps {
  onTransactionClick: (transaction: Transaction) => void;
  updatedTransaction: Transaction | null;
  newTransaction: Transaction | null;
}


export const TransactionList: React.FC<TransactionListProps> = ({ onTransactionClick, updatedTransaction, newTransaction }) => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await transactionAPI.getAll(); // Fetch all without server-side filtering
      setAllTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Handle updated transaction without full refresh
  useEffect(() => {
    if (updatedTransaction) {
      setAllTransactions(prev =>
        prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
      );
    }
  }, [updatedTransaction]);

  // Handle new transaction without full refresh
  useEffect(() => {
    if (newTransaction) {
      setAllTransactions(prev => [newTransaction, ...prev]);
    }
  }, [newTransaction]);

  // Client-side filtering and sorting
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = allTransactions;

    // Apply search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(t =>
        t.contractor.toLowerCase().includes(searchLower) ||
        (t.description && t.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount; // Descending
        case 'contractor':
          return a.contractor.localeCompare(b.contractor);
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime(); // Most recent first
      }
    });

    return sorted;
  }, [allTransactions, search, sortBy]);


  return (
    <Paper sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        All Transactions
      </Typography>

      {/* Search and Sort Controls */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by contractor or description..."
            fullWidth
            size="small"
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
              <MenuItem value="contractor">Contractor</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ flex: 1 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Contractor</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onTransactionClick(transaction)}
                >
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.contractor}</TableCell>
                  <TableCell align="right">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={transaction.status.toUpperCase()}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{transaction.description || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAndSortedTransactions.length === 0 && !loading && (
            <Box textAlign="center" p={4}>
              <Typography color="text.secondary">
                {allTransactions.length === 0 ? 'No transactions found' : 'No transactions match your search'}
              </Typography>
            </Box>
          )}
        </TableContainer>
      )}
    </Paper>
  );
};