import { useContext } from 'react';
import { AuthContext } from '.';
import { IContext } from './type';

export const useAuth = (): IContext => {
  const context = useContext(AuthContext);
  return context;
};
