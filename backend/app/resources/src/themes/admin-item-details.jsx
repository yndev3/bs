import React, { Component } from 'react';

import Header from '../components/Header/Header';
import ItemDetail from '../components/Admin/ItemDetails';
import Footer from '../components/Footer/Footer';
import Scrollup from '../components/Scrollup/Scrollup';

class ItemDetails extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <ItemDetail />
                <Footer />
                <Scrollup />
            </div>
        );
    }
}

export default ItemDetails;