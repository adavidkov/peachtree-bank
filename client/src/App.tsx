import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { theme } from './theme';
import type { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/dashboard/:transactionId" 
              element={
                user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;