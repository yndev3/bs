import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useAuth } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Footer = () => {
    const {isAuthenticated} = useAuth();
    const {isConnected} = useAccount();
    const {disconnect} = useDisconnect();

    const data = {
        content: "BrandSwap is the ultimate fusion of tangible value and digital technology, enabling seamless exchange between real-world assets and NFTs",
        widget_1: "Useful Links",
        widget_2: "Dashboard",
        widget_3: "Subscribe Us",
        widgetData_1: [
            { id: 1, text: "Watches NFTs", link: "/explore-watches" },
            { id: 2, text: "Jewellery NFTs", link: "/explore-jewelries" },
            { id: 3, text: "Materials NFTs", link: "/explore-materials" },
            { id: 4, text: "Store List", link: "/store-list" },
        ],
    };

    return (
        <footer className="footer-area">
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}
                                <a className="navbar-brand" href="/">
                                    <img src="/img/logo.png" alt="logo" />
                                </a>
                                <p>{data.content}</p>
                                {/* Social Icons */}
                                <div className="social-icons d-flex">
                                    <a className="discord disable-link" href="#">
                                        <i className="fab fa-discord" />
                                    </a>
                                    <a className="twitter" href="https://twitter.com/brandswap">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a className="github" href="https://github.com/BrandSwap">
                                        <i className="fab fa-github" />
                                    </a>
                                    <a className="LinkTree disable-link" href="#">
                                        <i className="fa fa-tree" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">{data.widget_1}</h4>
                                <ul>
                                    {data.widgetData_1.map((item) => (
                                        <li key={item.id}><Link to={item.link}>{item.text}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">{data.widget_2}</h4>
                                <ul>
                                {
                                    isConnected && isAuthenticated ? (
                                        <>
                                        <li><Link to="/account">My Account</Link></li>
                                        <li><Link to="/activity">Activity</Link></li>
                                        <li><Link to="/exchange-reservation">Exchange Reservation</Link></li>
                                        <li><Link to="/wallet-connect" onClick={disconnect}>Disconnect</Link></li>
                                        </>
                                    ) : (
                                        <li><Link to="/wallet-connect">Please Wallet Connect</Link></li>
                                    )
                                }
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">{data.widget_3}</h4>
                                {/* Subscribe Form */}
                                <div className="subscribe-form d-flex align-items-center">
                                    <input type="email" className="form-control" placeholder="🔗 Access Form" disabled/>
                                    <a href="https://forms.gle/JCs24y31zPWLGvpx5" className="btn" target='blank'>
                                        <i className="icon-paper-plane" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Copyright Area */}
                            <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                {/* Copyright Left */}
                                <div className="copyright-left">©2023 All Rights Reserved.</div>
                                {/* Copyright Right */}
                                <div className="copyright-right">Made with <i className="fas fa-heart" /> By <a href="/">BrandSwap</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
