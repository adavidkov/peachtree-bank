import { findUserByCredentials } from '../repositories/userRepository';
import { LoginRequest } from '../types';

export const authenticateUser = (credentials: LoginRequest) => {
  const user = findUserByCredentials(credentials.username, credentials.password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return { id: user.id, username: user.username };
};