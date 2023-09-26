import React from 'react';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Reservation from '../components/Reservation/Reservation';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';


const Activity = () => {

    return (
        <div className="main">
        <Header />
        <Breadcrumb title="Exchange Reservation" subpage="Exchange Reservation" page="Exchange Reservation" />
        <Reservation />
        <Footer />
        <ModalMenu />
        <Scrollup />
    </div>
    );
};

export default Activity;