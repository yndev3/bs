import React, { useEffect, useState } from 'react';
import WalletCard from './WalletCard';
import { useRecoilState} from 'recoil';
import { walletAddressAtom } from '../../atoms/WalletAddressAtom';

const mumbaiId = '0x13881';

export default function Wallet() {
  const [address, setAddress] = useRecoilState(walletAddressAtom);
  const [chainId, setChainId] = useState(false);
  console.log(`address: ${ address }`);
  console.log(`chainId: ${ chainId }`);

  const connectWithMetamask = async () => {
    const {ethereum} = window;
    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAddress(accounts[0]);
        // todo chainをグローバルにセット
        // todo 設定されたchainがpolygonのchainでなければ、alertを出す

      } catch (err) {
        console.log(err);
      }
    }
  };

  const connectWithWalletConnect = async (e) => {};
  const disconnectMetamask = async () => setAddress(null);

  const checkChainId = async () => {
    const {ethereum} = window;
    if (ethereum) {
      const chain = await ethereum.request({
        method: 'eth_chainId',
      });
      console.log(`checkChainId: ${ chain }`);
      if (chain !== mumbaiId) {
        alert('Mumbaiに接続してください');
        setChainId(false);
      } else {
        setChainId(true);
      }
    }
  };

  useEffect(() => {
    const {ethereum} = window;
    if (ethereum) {
      ethereum.on('accountsChanged', disconnectMetamask);
      ethereum.on('chainChanged', checkChainId);
    }
  }, [address, chainId]);

  return (
      <section className="wallet-connect-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */ }
              <div className="intro text-center">
                <span>WALLET CONNECT</span>
                <h3 className="mt-3 mb-0">Connect your Wallet</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center items">
            <WalletCard title="MetaMask"
                        img="/img/metamask.png"
                        content=""
                        onClick={ address === null
                            ? connectWithMetamask
                            : disconnectMetamask }
                        buttonText={ address === null
                            ? 'Connect'
                            : 'Disconnect' }
            />
            <WalletCard title="WalletConnect"
                        img="/img/walletconnect.png"
                        content=""
                        onClick={ connectWithWalletConnect }
                        buttonText="Coming Soon"

            />
          </div>
        </div>
      </section>
  );
};