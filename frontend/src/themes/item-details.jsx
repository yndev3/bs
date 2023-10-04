import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Header from '../components/Header/Header';
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
            <ItemDetail />
            <Footer />
            <ModalMenu />
            <Scrollup />
        </div>
    );
};

export default ItemDetails;
