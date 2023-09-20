import React from 'react';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Account from '../components/Account/Account';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

function AccountApp() {

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="My Account" subpage="My Account" page="My Account" />
            <Account/>
            <Footer />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default AccountApp;
