import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
                    <Link className="navbar-brand" to="/">
                        <img className="navbar-brand-sticky" src="/img/logo.png" alt="sticky brand-logo" />
                    </Link>
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


                    {/* Navbar Action Button */ }
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                            <NavLink to={ '/' }
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