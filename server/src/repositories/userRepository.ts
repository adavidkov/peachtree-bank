import { User } from '../types';

const users: User[] = [
  { id: '1', username: 'admin', password: '1234' }
];

export const findUserByCredentials = (username: string, password: string): User | undefined => {
  return users.find(user => user.username === username && user.password === password);
};