// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { useEffect } from 'react';
import { logout } from './utils/fetchFromApi';
import { useAuth } from './providers/AuthProvider';

const App = () => {
  const { setIsAuthenticated } = useAuth();
  const {disconnect} = useDisconnect();
  const {chain, chains} = useNetwork();
  const {connector: activeConnector} = useAccount({
    onDisconnect() {
      logout().then(() => {
        setIsAuthenticated(false);
        console.log('Disconnected');
      });
    },
  });
  useEffect(() => {
    const handleConnectorUpdate = ({account, chain}) => {
      if (account) {
        console.log('new account', account);
        disconnect();
        alert('You have changed your account. Please log in again.');
      }
      if (chain) {
        console.log('new chain', chain);
      }
    };

    if (activeConnector) {
      activeConnector.on('change', handleConnectorUpdate);
    }

    return () => {
      activeConnector?.off('change', handleConnectorUpdate);
    };
  }, [activeConnector]);

  return (
      <>
        <MyRouts/>
      </>
  );
}
export default App;