import { User, RegisterRequest } from '../types';
import bcrypt from 'bcryptjs';

const users = new Map<string, User>();

users.set('admin', {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  password: bcrypt.hashSync('1234', 10)
});

export const findUserByUsername = (username: string): User | undefined => {
  return users.get(username);
};

export const findUserByCredentials = async (username: string, password: string): Promise<User | undefined> => {
  const user = users.get(username);
  if (!user) return undefined;
  
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : undefined;
};

export const createUser = async (userData: RegisterRequest): Promise<User> => {
  if (users.has(userData.username)) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser: User = {
    id: Date.now().toString(),
    username: userData.username,
    email: userData.email,
    password: hashedPassword
  };

  users.set(userData.username, newUser);
  return newUser;
};