import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/AdminBreadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class ItemDetails extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Item Details" subpage="ItemName"/>
                <ItemDetail />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ItemDetails;