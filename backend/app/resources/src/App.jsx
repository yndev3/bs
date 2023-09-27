// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { useAccount, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useLogout } from './hooks/fetchFromApi.jsx';

const App = () => {
  const {disconnect} = useDisconnect();
  const {logout} = useLogout();
  const {connector: activeConnector} = useAccount({
    onDisconnect() {
      logout().then(() => {console.log('Disconnected');});
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