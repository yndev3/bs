import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';


const Profile = () => {


    return (
            <ul className="navbar-nav items icons">
                <li className="nav-item dropdown">
                    <Link className="nav-link" to="#"><i className="fa fa-user" /><i className="fas fa-angle-down ml-1" /></Link>
                    <ul className="dropdown-menu">
                        <li className="nav-item"><NavLink to={'/account'} className="nav-link">My Account</NavLink></li>
                        <li className="nav-item"><NavLink to="./" className="nav-link">Disconnect</NavLink></li>
                    </ul>
                </li>
            </ul>
    );
};

export default Profile;