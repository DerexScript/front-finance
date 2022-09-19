import SimpleBackdrop from 'components/atoms/loading2';
import React, { createContext, useEffect, useState } from 'react';
import { IAuthProvider, IContext, IUser } from './type';
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider): JSX.Element => {
  const [user, setUser] = useState<IUser | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = getUserLocalStorage();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const authenticate = async (credential: string, password: string): Promise<boolean> => {
    const res = await LoginRequest(credential, password);
    if (res) {
      const payload = { token: res.token, credential };
      setUser(payload);
      setUserLocalStorage(payload);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
    setUserLocalStorage(null);
  };

  return (
    <>
      {!loading ? (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
          {children}
        </AuthContext.Provider>
      ) : (
        <SimpleBackdrop state={loading} />
      )}
    </>
  );
};
