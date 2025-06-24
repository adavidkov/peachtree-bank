import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';
import { LoginRequest } from '../types';

export const login = async (req: Request, res: Response) => {
  try {
    const credentials: LoginRequest = req.body;
    const user = authenticateUser(credentials);
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};