import React from 'react';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Activities from '../components/Activity/Activity';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';


const Activity = () => {

    return (
        <div className="main">
        <Header />
        <Breadcrumb title="Activity" subpage="Pages" page="Activity" />
        <Activities />
        <Footer />
        <ModalMenu />
        <Scrollup />
    </div>
    );
};

export default Activity;