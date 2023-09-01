import '../js/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';

const projectId = import.meta.env.VITE_WALLET_CONNECT_ID;
const {chains, publicClient} = configureChains(
    [polygonMumbai, polygon],
    [
      alchemyProvider({apiKey: import.meta.env.VITE_ALCHEMY_KEY}),
      // w3mProvider({projectId}),
      publicProvider(),
    ],
);
const config = createConfig({
  autoConnect: true,
  connectors: [
  // ...w3mConnectors({chains, projectId}),
    new MetaMaskConnector({
      chains: [polygonMumbai, polygon],
    }),
  ],
  // connectors:  w3mConnectors({chains, projectId}),
  publicClient,
});
const ethereumClient = new EthereumClient(config, chains);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={ config }>
    <App />
    </WagmiConfig>
    {/*<Web3Modal projectId={projectId} ethereumClient={ethereumClient} />*/}
  </React.StrictMode>
);
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
