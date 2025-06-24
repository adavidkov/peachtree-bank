import { Request, Response } from 'express';
import { authenticateUser, registerUser } from '../services/authService';
import { LoginRequest, RegisterRequest } from '../types';

export const login = async (req: Request, res: Response) => {
  try {
    const credentials: LoginRequest = req.body;
    const user = await authenticateUser(credentials);
    console.log(`User ${user.username} successfully logged in`);
    res.json({ user });
  } catch (error) {
    console.log(`Login failed for username: ${req.body.username}`);
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const userData: RegisterRequest = req.body;
    const user = await registerUser(userData);
    console.log(`New user ${user.username} successfully registered`);
    res.status(201).json({ user });
  } catch (error) {
    console.log(`Registration failed for username: ${req.body.username}`, error instanceof Error ? error.message : 'Unknown error');
    res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' });
  }
};