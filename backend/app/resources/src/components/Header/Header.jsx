import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi'

const Header = () => {
    const { address , isConnected} = useAccount();
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
                        <img className="navbar-brand-sticky" src="/img/logo.png" alt="sticky brand-logo" />
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <NavLink to={'/'} className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink to={'/admin/create'} className="nav-link">Create NFT</NavLink>
                        </li>   
                        <li className="nav-item dropdown">
                            <NavLink to={'/admin/itemlist'} className="nav-link">Item LIST</NavLink>
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
                                isConnected
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