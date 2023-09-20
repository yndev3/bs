import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Error404 from '../components/Error/404';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Error404page extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Error404 />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Error404page;