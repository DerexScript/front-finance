import { useAuth } from 'context/AuthProvider/useAuth';
import React from 'react';

export const ProtectedLayout = ({
  ...props
}: {
  children: JSX.Element;
  protected: boolean;
}): JSX.Element => {
  const auth = useAuth();
  if (!auth.credential && props.protected) {
    return <h1>You don&apos;t have access</h1>;
  }
  return props.children;
};
