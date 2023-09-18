import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAccount } from 'wagmi'
import Profile from './Profile';
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
                            <Link className="nav-link" to="#">Explore<i className="fas fa-angle-down ml-1" /></Link>
                            <ul className="dropdown-menu">
                                <li className="nav-item"><Link to={'/explore-watches'} className="nav-link">Watches</Link></li>
                                <li className="nav-item"><Link to={'/explore-jewelrys'} className="nav-link">Jewelrys</Link></li>
                                <li className="nav-item"><Link to={'/explore-materials'} className="nav-link">Materials</Link></li>
                            </ul>
                        </li>
                    </ul>
                    {/* User Info */}
                    {isConnected && <Profile />}
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <Link to="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </Link>
                        </li>
                    </ul>
                    {/* Navbar Action Button */ }
                    <ul className="navbar-nav">
                        <li className="nav-item ml-3">
                            <Link to={ '/wallet-connect' }
                               className="btn ml-lg-auto btn-bordered-white wallet-btn">
                                <i className="icon-wallet mr-md-2"/>{
                                isConnected
                                    ? shortenAddress(address)
                                    : 'Connect Wallet'
                            }</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;