import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Wallet from '../components/Wallet/Wallet';
import Footer from '../components/Footer/Footer';
import Scrollup from '../components/Scrollup/Scrollup';


export default function WalletConnect() {
        return (
            <div className="main">
                <Header />
                <Wallet />
                <Footer />
                <Scrollup />
            </div>
        );
}

