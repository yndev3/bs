import React from 'react';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../../atoms/WalletAddressAtom';

export default function WalletAddress() {
  const address = useRecoilValue(walletAddressAtom);
  const shortenAddress = (address, chars = 4) => {
    return `${ address.slice(0, 2) }...${ address.slice(-chars) }`;
  };
  return (
      <>
        {/* Navbar Action Button */ }
        <ul className="navbar-nav action">
          <li className="nav-item ml-3">
            <a href="/wallet-connect"
               className="btn ml-lg-auto btn-bordered-white">
              <i className="icon-wallet mr-md-2"/>{
              address !== null
                  ? shortenAddress(address)
                  : 'Connect Wallet'
            }</a>
          </li>
        </ul>
      </>
  );
};
