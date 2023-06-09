import React, { useContext } from 'react';
import WalletAddress from './WalletAddress';
import { useRecoilValue } from 'recoil';
import { walletAddressAtom } from '../../atoms/WalletAddressAtom';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const address = useRecoilValue(walletAddressAtom);
    const shortenAddress = (address, chars = 4) => {
        return `${ address.slice(0, 2) }...${ address.slice(-chars) }`;
    };

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <a className="navbar-brand" href="/">
                        <img className="navbar-brand-sticky" src="img/logo.png" alt="sticky brand-logo" />
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <NavLink to={'/'} className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/create'} className="nav-link">Create</NavLink>
                        </li>
                    </ul>
                    {/* Navbar Icons */}
                    <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="fas fa-search" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */ }
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                            <NavLink to={ '/wallet-connect' }
                               className="btn ml-lg-auto btn-bordered-white">
                                <i className="icon-wallet mr-md-2"/>{
                                address !== null
                                    ? shortenAddress(address)
                                    : 'Connect Wallet'
                            }</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;