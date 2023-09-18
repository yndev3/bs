import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const ItemDetails = () => {
    const { id } = useParams();  
    const history = useHistory();  

    useEffect(() => {
        if (!id) {  
            history.push('/error');  
        }
    }, [id, history]);

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Item Details" subpage="ItemName"/>
            <ItemDetail />
            <Footer />
            <ModalMenu />
            <Scrollup />
        </div>
    );
};

export default ItemDetails;
