import React from 'react';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import StoreList from '../components/Store/StoreList';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';


const Activity = () => {

    return (
        <div className="main">
        <Header />
        <Breadcrumb title="Store List" subpage="Store List" page="Store List" />
        <StoreList />
        <Footer />
        <ModalMenu />
        <Scrollup />
    </div>
    );
};

export default Activity;