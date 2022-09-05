import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './type';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider): JSX.Element => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
  }, []);

  const authenticate = async (
    credential: string,
    password: string
  ): Promise<void> => {
    const res = await LoginRequest(credential, password);
    const payload = { token: res.token, credential };
    setUser(payload);
    setUserLocalStorage(payload);
  };

  const logout = (): void => {
    setUser(null);
    setUserLocalStorage(null);
  };

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
