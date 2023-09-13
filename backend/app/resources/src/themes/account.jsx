import React from 'react';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Account from '../components/Profile/Account';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const initData = {
    heading: "My Item Collection",
}

function AccountApp() {
    return (
        <div className="main">
            <Header />
            <Breadcrumb title="My Account" subpage="My Account" page="My Account" />
            <Account initData={initData} />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default AccountApp;
