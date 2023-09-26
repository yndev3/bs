import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAccount, useNetwork } from 'wagmi';
import Profile from './Profile';
import { useAuth } from '../../providers/AuthProvider';

const Header = () => {
  const {isAuthenticated, isLoading} = useAuth();
  const {address, isConnected} = useAccount();
  const {chain, chains} = useNetwork();
  const shortenAddress = (address, chars = 4) => {
    return `${ address.slice(0, 2) }...${ address.slice(-chars) }`;
  };

  const isPolygon = () => {
    return isConnected && chain.id !== chains[1].id;
  };

  return (
      <>
        <header id="header">
          {/* Navbar */ }
          <nav data-aos="zoom-out" data-aos-delay={ 800 }
               className="navbar navbar-expand">
            <div className="container header">
              {/* Navbar Brand*/ }
              <Link className="navbar-brand" to="/">
                <img className="navbar-brand-sticky" src="/img/logo.png"
                     alt="sticky brand-logo"/>
              </Link>
              <div className="ml-auto"/>
              {/* Navbar */ }
              <ul className="navbar-nav items mx-auto">
                <li className="nav-item dropdown">
                  <NavLink to={ '/' } className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="#">Explore<i
                      className="fas fa-angle-down ml-1"/></Link>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <Link to={ '/explore-watches' }
                            className="nav-link">Watches</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={ '/explore-jewelries' }
                            className="nav-link">Jewelries</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={ '/explore-materials' }
                            className="nav-link">Materials</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* User Info */ }
              { isAuthenticated && <Profile/> }
              {/* Navbar Toggler */ }
              <ul className="navbar-nav toggle">
                <li className="nav-item">
                  <Link to="#" className="nav-link" data-toggle="modal"
                        data-target="#menu">
                    <i className="fas fa-bars toggle-icon m-0"/>
                  </Link>
                </li>
              </ul>
              {/* Navbar Action Button */ }
              <ul className="navbar-nav">
                <li className="nav-item ml-3">
                  <Link to={ '/wallet-connect' }
                        className="btn ml-lg-auto btn-bordered-white wallet-btn">
                    { isLoading
                        ? (<span><i className="fas fa-spinner fa-spin mr-2"/> Connecting...</span>)
                        : (isConnected && isAuthenticated)
                            ? <><i className="icon-wallet mr-md-2"/> { shortenAddress(address) }</>
                            :'Connect Wallet'
                    }</Link>
                </li>
              </ul>
            </div>

          </nav>
          {
              isPolygon() &&
              <div className="alert alert-danger text-center" role="alert">
                Please switch to the polygon network.
              </div>
          }
        </header>
      </>
  );
};

export default Header;