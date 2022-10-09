import { useAuth } from 'context/AuthProvider/useAuth';
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedLayout = ({ ...props }: { children: JSX.Element; protected: boolean; }): JSX.Element => {
  const auth = useAuth();
  if (!auth.credential && props.protected) {
    return <Navigate to='/Login' />;
  }
  return props.children;
};
