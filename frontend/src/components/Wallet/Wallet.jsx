import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WalletCard from './WalletCard';
import {
  useAccount,
  useConnect,
  useNetwork,
  useDisconnect,
  useSignMessage, useSwitchNetwork,
} from 'wagmi';
import { toMessage } from '../SignIn/toMessage';
import { useWeb3Modal } from '@web3modal/react';
import { fetchFromApi } from '../../utils/fetchFromApi';
import { useAuth } from '../../providers/AuthProvider';

const domain = window.location.host;
const origin = window.location.origin;
export default function Wallet() {
  const [statementData, setStatementData] = useState(null);
  const {isAuthenticated, setAuth, setIsLoading} = useAuth();
  const {connectAsync, connectors, error} = useConnect();
  const {connector: activeConnector, address, isConnected} = useAccount();
  const {disconnect} = useDisconnect();
  const {signMessageAsync} = useSignMessage();
  const {open, close} = useWeb3Modal();
  const history = useHistory();
  const {chain, chains} = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
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
  async function fetchData() {
    const {statement, nonce, issuedAt} = await fetchFromApi(
        {endpoint: '/api/statement'});
    return {statement, nonce, issuedAt};
  }

  const handleConnect = async (connector) => {
    if (connector.id === 'walletConnect') {
      await open();
    } else {
      await connectAsync({connector});
    }
    const data = await fetchFromApi({endpoint: '/api/statement'});
    setStatementData(data);
  };

  async function connectWallet() {
    const {statement, nonce, issuedAt} = statementData || await fetchData();
    const message = createSiweMessage(
        address,
        chain.id,
        statement,
        nonce,
        issuedAt,
    );
    const signature = await signMessageAsync({message});
    const payload = {signature, message, address, nonce, issuedAt};
    const responseData = await fetchFromApi({
      endpoint: '/api/login',
      method: 'POST',
      data: payload,
    });

    if (responseData.status && responseData.status !== 'success') {
      throw new Error(responseData.message);
    }
    // network check
    if (activeConnector.id !== 'walletConnect'
        && ![chains[0].id, chains[1].id].includes(chain.id)) {
        switchNetwork?.(chains[1].id)
    }
  }

  useEffect(() => {
    if (isConnected && !isAuthenticated) {
      setIsLoading(true);
      (async () => {
        try {
          await connectWallet();
          setAuth(true);
          console.log('Connected');
          history.goBack();
        } catch (error) {
          setAuth(false);
          console.error('Error during connection:', error);
          disconnect();
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isConnected, isAuthenticated]);

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
          { error && <div className={ 'text-danger' }>{ error.message }</div> }
          <div className="row justify-content-center items">
            { connectors.map((connector) => {
              if (connector.id !== 'injected') {
                return (
                    <WalletCard
                        key={ connector.id }
                        title={ connector.name }
                        img={ `/img/${ connector.id }.svg` }
                        onClick={
                          !isConnected
                              ? () => handleConnect(connector)
                              : () => disconnect()
                        }
                        buttonText={ !isConnected
                            ? 'Connect'
                            : 'Disconnect' }
                    />
                );
              }
            }) }
          </div>
        </div>
      </section>
  );
};
