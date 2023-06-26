import { useEffect, useState } from 'react';

// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';

export default function App() {
  const [chainId, setChainId] = useState(false);

  const mumbaiId = '0x13881';
  const zeroAddress = '0x0000000000000000000000000000000000000000';
  const checkMetaMaskInstalled = async () => {
    const {ethereum} = window;
    if (!ethereum) {
      alert('Please, Install Meta Mask!');
    }
  };

  const checkChainId = async () => {
    const {ethereum} = window;
    if (ethereum) {
      const chain = await ethereum.request({
        method: 'eth_chainId',
      });
      console.log(`chain: ${ chain }`);

      if (chain !== mumbaiId) {
        alert('Connect with Mumbai Testnet!');
        setChainId(false);
      } else {
        setChainId(true);
      }
    }
  };

  useEffect(() => {
    checkMetaMaskInstalled();
    checkChainId();
  }, []);
  return (
      <div>
        <MyRouts/>
      </div>
  );
}
