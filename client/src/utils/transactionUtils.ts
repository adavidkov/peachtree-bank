import type { Transaction } from '../types';

export const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'sent': return 'error';
    case 'received': return 'warning';
    case 'paid': return 'success';
    default: return 'default';
  }
};