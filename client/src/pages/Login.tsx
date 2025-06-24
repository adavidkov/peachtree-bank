import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AccountBalance } from '@mui/icons-material';
import { authAPI } from '../services/api';
import type { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({ username, password });
      onLogin(response.user);
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <AccountBalance sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h4" textAlign="center">
              Transaction Manager
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                  autoFocus
                />
                
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
                
                {error && (
                  <Alert severity="error">{error}</Alert>
                )}
                
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                  fullWidth
                  size="large"
                >
                  Login
                </LoadingButton>
              </Stack>
            </Box>
            
            <Chip
              label="Default: admin / 1234"
              variant="outlined"
              color="info"
              size="small"
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};