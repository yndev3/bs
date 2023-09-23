// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { logout } from './utils/fetchFromApi';
import { useAuth } from './providers/AuthProvider';

const App = () => {
  const { setAuth } = useAuth();
  const {disconnect} = useDisconnect();
  const {connector: activeConnector} = useAccount({
    onDisconnect() {
      logout().then(() => {
        setAuth(false);
        console.log('Disconnected');
      });
    },
  });
  useEffect(() => {
    const handleConnectorUpdate = ({account, chain}) => {
      if (account) {
        disconnect();
        alert('You have changed your account. Please log in again.');
      }
    };

    if(activeConnector && activeConnector.id !== 'walletConnect'){
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