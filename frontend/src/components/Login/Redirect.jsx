import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAccount } from 'wagmi'

export const useRedirectIfNotConnected = () => {
  const { isConnected } = useAccount();
  const history = useHistory();

  useEffect(() => {
    if (!isConnected) {
      history.push('/wallet-connect');
    }
  }, [isConnected, history]);
};