import React from 'react';
import WalletCard from './WalletCard';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { toMessage } from '../SignIn/toMessage';
import { useWeb3Modal } from '@web3modal/react';
import { useFetchFromApi } from '../../hooks/fetchFromApi';

const domain = window.location.host;
const origin = window.location.origin;
export default function Wallet() {
  const {connectAsync, connectors, error} = useConnect();
  const {isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {signMessageAsync} = useSignMessage();
  const {open, close} = useWeb3Modal();
  const {fetchFromApi} = useFetchFromApi();
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
      // is admin account check from api
      const {isAdmin} = await fetchFromApi({
        endpoint: `/api/isAdmin/${connect.account}`
      });

      if (!isAdmin) {
        alert('Not an admin account');
        throw new Error('Not an admin account');
      }
      const {statement, nonce, issuedAt} = await fetchFromApi({
        endpoint: '/api/statement'
      });

      const message = createSiweMessage(
          connect.account,
          connect.chain.id,
          statement,
          nonce,
          issuedAt,
      );
      const signature = await signMessageAsync({message});
      const payload = {
        signature,
        message,
        address: connect.account,
        nonce,
        issuedAt,
      };

      await fetchFromApi({
        endpoint: '/api/login',
        method: 'POST',
        data: payload,
      });
    } catch (error) {
      console.error('Error during connection:', error);
      disconnect();
    }
  };


  return (
      <section className="wallet-connect-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */ }
              <div className="intro text-center mt-5">
                <span>WALLET CONNECT</span>
                <h3 className="mt-3 mb-0">MASTER DASHBOARD</h3>
              </div>
            </div>
          </div>
          { error && <div className={ 'text-danger' }>{ error.message }</div> }
          <div className="row justify-content-center items">
            { connectors.map((connector) => (
                <WalletCard
                    key={ connector.id }
                    title={ connector.name }
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
