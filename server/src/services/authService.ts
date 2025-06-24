import jwt from 'jsonwebtoken';
import { findUserByCredentials, createUser } from '../repositories/userRepository';
import { LoginRequest, RegisterRequest } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'sercret-key-for-peachtree-bank-app';

export const authenticateUser = async (credentials: LoginRequest) => {
  const user = await findUserByCredentials(credentials.username, credentials.password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
  
  return { 
    id: user.id, 
    username: user.username, 
    email: user.email,
    token 
  };
};

export const registerUser = async (userData: RegisterRequest) => {
  const user = await createUser(userData);
  
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
  
  return { 
    id: user.id, 
    username: user.username, 
    email: user.email,
    token 
  };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};