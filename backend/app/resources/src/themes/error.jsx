import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Error from '../components/Error/Error';
import Footer from '../components/Footer/Footer';
import Scrollup from '../components/Scrollup/Scrollup';

class Login extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Error />
                <Footer />
                <Scrollup />
            </div>
        );
    }
}

export default Login;