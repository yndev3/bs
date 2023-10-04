import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Wallet from '../components/Wallet/Wallet';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';


export default function WalletConnect() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Wallet Connect" subpage="Wallet Connect" page="Wallet Connect" />
                <Wallet />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
}

