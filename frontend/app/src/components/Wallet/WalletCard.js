import React from 'react';
import axios from 'axios';

export default function WalletCard(walletInfo) {
  return (
      <>
        <div className="col-12 col-md-6 col-lg-4 item" onClick={walletInfo.onClick}>
          {/* Single Wallet */ }
          <div className="card single-wallet">
            <a className="d-block text-center">
              <img className="avatar-lg" src={ walletInfo.img } alt=""/>
              <h4 className="mb-0">{ walletInfo.title }</h4>
              <p>{ walletInfo.content }</p>
            </a>
          </div>
        </div>
      </>
  );
};