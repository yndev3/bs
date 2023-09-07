import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { toMessage } from '../SignIn/toMessage';
import { useWeb3Modal } from '@web3modal/react';
import { fetchFromApi } from '../../utils/fetchFromApi';
import axios from 'axios';

const domain = window.location.host;
const origin = window.location.origin;
axios.defaults.withCredentials = true;
export default function Wallet() {
  const {connectAsync, connectors, error} = useConnect();
  const {isConnected, isDisconnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {signMessageAsync} = useSignMessage();
  const {open, close} = useWeb3Modal();

  const createSiweMessage = (address, chainId, statement, nonce, issuedAt) => {
    return toMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: chainId,
      nonce,
      issuedAt,
    });
  };

  const handleConnect = async (connector) => {
    try {
      const connect = await connectAsync({connector});
      const {statement, nonce, issuedAt} = await fetchFromApi(
          {endpoint: '/api/statement'});

      const message = createSiweMessage(
          connect.account,
          connect.chain.id,
          statement,
          nonce,
          issuedAt,
      );

      const signature = await signMessageAsync({message});

      // to set the CSRF cookie for Laravel Sanctum
      await fetchFromApi({endpoint: '/sanctum/csrf-cookie'});

      const payload = {
        signature,
        message,
        address: connect.account,
        nonce,
        issuedAt,
      };

      const responseData = await fetchFromApi({
        endpoint: '/api/login',
        method: 'POST',
        data: payload,
      });
      console.log(responseData);
    } catch (error) {
      console.error('Error during connection:', error);
      disconnect();
    }
  };

  const click = async () => {
    try {
      const res = await fetchFromApi('/api/user');
      console.log(res);
    } catch (e) {
      console.log(e);
      disconnect();
    }
  };

  useEffect(() => {
    if (isConnected) {
      console.log('Connected');
    }
  }, [isConnected, isDisconnected]);

  return (
      <section className="wallet-connect-area">
        <button onClick={ click }>test</button>
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
          { error && <div className={ 'text-danger' }>{ error.message }</div> }
          <div className="row justify-content-center items">
            { connectors.map((connector) => (
                <WalletCard title={ connector.name }
                            img={ `/img/${ connector.id }.svg` }
                            content=""
                            onClick={ !isConnected
                                ? connector.id !== 'walletConnect'
                                    ? () => handleConnect(connector)
                                    : () => open()
                                : () => disconnect() }
                            buttonText={ !isConnected
                                ? 'Connect'
                                : 'Disconnect' }
                />
            )) }
          </div>
        </div>
      </section>
  );
};
