import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { toMessage } from '../SignIn/toMessage';
import axios  from 'axios';

const domain = window.location.host;
const origin = window.location.origin;

export default function Wallet() {
  const { connectAsync, connectors, error } = useConnect()
  const {isConnected , isDisconnected } = useAccount();
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage({
    onError(error) {
      console.log('Error', error)
    },
  })

  const createSiweMessage  =  (address, chainId, statement) => {
    return toMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: chainId
    });
  }

  const handleConnect = async (connector) => {
    const connect = await connectAsync({connector});
    const message = createSiweMessage(
        connect.account,
        connect.chain.id,
        'Sign in with Ethereum to the app.'
    );
    const signature = await signMessageAsync({message});
    console.log('Signature', signature);
    // TODO: Send signature to backend
    const res = await axios.post('/api/v1/auth', {
      signature: signature,
      message: message,
      address:  connect.account,
    });
    console.log(await res.text());
  };

  useEffect(() => {
    if (isConnected) {
      console.log('Connected');
    }
  }, [isConnected, isDisconnected]);

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
          {error && <div className={"text-danger"}>{error.message}</div>}
          <div className="row justify-content-center items">
            {connectors.map((connector) => (
                <WalletCard title={connector.name}
                            img={ `/img/${connector.id}.svg` }
                            content=""
                            onClick={ !isConnected
                                ? () => handleConnect(connector)
                                : () => disconnect() }
                            buttonText={ !isConnected
                                ? 'Connect'
                                : 'Disconnect' }
                />
            ))}
          </div>
        </div>
      </section>
  );
};
