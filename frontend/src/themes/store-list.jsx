import React from 'react';
import Header from '../components/Header/Header';
import StoreList from '../components/Store/StoreList';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';


const Activity = () => {

    return (
        <div className="main">
        <Header />
        <StoreList />
        <Footer />
        <ModalMenu />
        <Scrollup />
    </div>
    );
};

export default Activity;