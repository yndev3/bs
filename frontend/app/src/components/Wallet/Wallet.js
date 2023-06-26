import React from 'react';
import WalletCard from './WalletCard';
import axios from 'axios';

export default function Wallet() {

  const connectWithMetamask = async (e) => {
    const { ethereum } = window;
    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log(`accounts: ${ accounts }`);
        const chain = await ethereum.request({
          method: 'eth_chainId',
        });
        console.log(`chain: ${ chain }`);
        const balance = await ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });
        console.log(`balance: ${ balance }`);
        const res = await axios.get(`https://api.covalenthq.com/v1/${ chain }/address/${ accounts[0] }/balances_v2/?key=ckey_5c8e2e0b8e0c4b0f8b4c6f0d8e7`);
        console.log(res.data.data.items);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const connectWithWalletConnect = async (e) => {

  };
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
                        onClick={connectWithMetamask}/>
            <WalletCard title="WalletConnect"
                        img="/img/walletconnect.png"
                        content=""
                        onClick={connectWithWalletConnect}/>
          </div>
        </div>
      </section>
  );
};