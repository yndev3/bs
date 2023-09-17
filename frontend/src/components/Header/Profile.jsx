import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';

const Profile = () => {

    const {isConnected, isDisconnected} = useAccount();
    const {disconnect} = useDisconnect();

    useEffect(() => {
        if (isConnected) {
          console.log('Connected');
        }
      }, [isConnected, isDisconnected]);

    return (
            <ul className="navbar-nav items icons">
                <li className="nav-item dropdown">
                    <a className="nav-link" href="#"><i className="fa fa-user" /><i className="fas fa-angle-down ml-1" /></a>
                    <ul className="dropdown-menu">
                        <li className="nav-item"><Link to={'/account'} className="nav-link">My Account</Link></li>
                        <li className="nav-item"><Link to="./wallet-connect" className="nav-link" onClick={disconnect}>Disconnect</Link></li>
                    </ul>
                </li>
            </ul>
    );
};

export default Profile;