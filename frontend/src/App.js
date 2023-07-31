// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai, polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

export default function App() {
  const projectId = process.env.REACT_APP_WALLET_CONNECT_ID;
  const {chains, publicClient} = configureChains(
      [polygonMumbai, polygon],
      [
        alchemyProvider({apiKey: process.env.REACT_APP_ALCHEMY_KEY}),
        // w3mProvider({projectId}),
        publicProvider(),
      ],
  );
  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains: [polygonMumbai, polygon],
      }),
      // ...w3mConnectors({chains, projectId}),
    ],
    publicClient,
  });
  // const ethereumClient = new EthereumClient(config, chains);

  return (
      <>
        <WagmiConfig config={ config }>
          <MyRouts/>
        </WagmiConfig>
        {/*<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />*/}
      </>
  );
}
