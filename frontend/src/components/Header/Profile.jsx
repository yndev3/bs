import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';

const Profile = () => {

    const {isConnected, isDisconnected} = useAccount();
    const {disconnect} = useDisconnect();

    useEffect(() => {
        if (isConnected) {
        }
      }, [isConnected, isDisconnected]);

    return (
            <ul className="navbar-nav items icons">
                <li className="nav-item dropdown">
                    <Link className="nav-link" to="#"><i className="fa fa-user" /><i className="fas fa-angle-down ml-1" /></Link>
                    <ul className="dropdown-menu">
                        <li className="nav-item"><Link to={'/account'} className="nav-link">My Account</Link></li>
                        <li className="nav-item"><Link to={'/activity'} className="nav-link">Activity</Link></li>
                        <li className="nav-item"><Link to={'/exchange-reservation'} className="nav-link">Exchange Reservation</Link></li>
                        <li className="nav-item"><Link to="/wallet-connect" className="nav-link" onClick={disconnect}>Disconnect</Link></li>
                    </ul>
                </li>
            </ul>
    );
};

export default Profile;