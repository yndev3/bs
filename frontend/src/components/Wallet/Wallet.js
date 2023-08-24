import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { toMessage } from '../SignIn/toMessage';
import axios from 'axios';

const domain = window.location.host;
const origin = window.location.origin;
axios.defaults.withCredentials = true;
const BASE_URL = 'http://localhost';
export default function Wallet() {
  const {connectAsync, connectors, error} = useConnect();
  const {isConnected, isDisconnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {signMessageAsync} = useSignMessage({
    onError(error) {
      console.log('Error', error);
    },
  });

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

  const fetchFromApi = async (
      endpoint, method = 'GET', data = null, headers = {}) => {
    const config = {
      method,
      url: `${ BASE_URL }${ endpoint }`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      withCredentials: true,
      data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        disconnect();
      }
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleConnect = async (connector) => {
    const connect = await connectAsync({connector});
    const {statement, nonce, issuedAt} = await fetchFromApi('/api/statement');

    const message = createSiweMessage(
        connect.account,
        connect.chain.id,
        statement,
        nonce,
        issuedAt,
    );

    const signature = await signMessageAsync({message});

    await fetchFromApi('/sanctum/csrf-cookie');

    const payload = {
      signature,
      message,
      address: connect.account,
      nonce,
      issuedAt,
    };

    const responseData = await fetchFromApi('/api/login', 'POST', payload);
    console.log(responseData);
  };

  const handleDisconnect = async () => {
    await fetchFromApi('/sanctum/csrf-cookie');
    await fetchFromApi('/api/logout', 'POST');
    deleteAllCookies();
    disconnect();
  };

  function deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;max-age=0';
    }
  }

  const click = async () => {
    try {
      const res = await fetchFromApi('/api/user');
      console.log(await res.data);
    } catch (e) {
      console.log(e);
    }

  };

  useEffect(() => {
    if (isConnected) {
      console.log('Connected');
    }
    if (isDisconnected) {
      console.log('Disconnected');
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
                                ? () => handleConnect(connector)
                                : () => handleDisconnect() }
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
