import React from 'react';
import { Link } from 'react-router-dom';

export default function WalletCard(walletInfo) {
  return (
      <>
        <div className="col-12 col-md-6 col-lg-4 item">
          {/* Single Wallet */ }
          <div className="card single-wallet">
            <Link className="d-block text-center">
              <img className="avatar-lg" src={ walletInfo.img } alt=""/>
              <h4 className="mb-0">{ walletInfo.title }</h4>
              <p>{ walletInfo.content }</p>
            </Link>
            <button className="btn btn-bordered-white btn-smaller mt-3"
                    onClick={ walletInfo.onClick }>
              { walletInfo.buttonText }
            </button>
          </div>
        </div>
      </>
  );
};