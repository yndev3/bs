import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAccount } from 'wagmi';

const RedirectIfNotConnected = ({ children }) => {
  const { isConnected } = useAccount();
  const history = useHistory();

  useEffect(() => {
    if (!isConnected) {
      history.push('/');
    }
  }, [isConnected, history]);

  if (!isConnected) {
    return null; 
  }

  return <>{children}</>;
};

export default RedirectIfNotConnected;