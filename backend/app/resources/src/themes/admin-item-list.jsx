import React, { Component } from 'react';

import Header from '../components/Header/Header';
import ItemList from '../components/ItemList/ItemList';
import Footer from '../components/Footer/Footer';
import Scrollup from '../components/Scrollup/Scrollup';

class ItemDetails extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <ItemList />
                <Footer />
                <Scrollup />
            </div>
        );
    }
}

export default ItemDetails;