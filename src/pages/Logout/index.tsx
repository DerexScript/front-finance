import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthProvider/useAuth';
import Loading from 'components/atoms/loading2';

const Logout = (): JSX.Element => {
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (auth.credential) {
      auth.logout();
      navigate('/login');
    } else {
      navigate(-1);
    }
  }, []);
  return <Loading state={true} />;
};
export default Logout;
