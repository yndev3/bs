import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Error from '../components/Error/Error';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Login extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Error" subpage="Pages" page="Error" />
                <Error />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Login;