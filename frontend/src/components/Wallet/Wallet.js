import React, { useEffect, useState } from 'react';
import WalletCard from './WalletCard';
import { useAccount, useConnect, useDisconnect  } from 'wagmi'
const mumbaiId = '0x13881';

export default function Wallet() {
  const [chainId, setChainId] = useState(false);
  const { connector: activeConnector, isConnected , isDisconnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (!activeConnector) {
      return;
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
                                ? () => connect({connector})
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
