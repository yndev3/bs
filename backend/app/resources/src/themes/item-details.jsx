import React, { useEffect, useState } from 'react';
import { fetchFromApi } from '../utils/fetchFromApi';
import { useParams } from 'react-router-dom';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import ItemDetail from '../components/ItemDetails/ItemDetails';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const ItemDetails = () => {
    const [itemDataApi, setItemDataApi] = useState(null); // 状態追加
    const [error, setError] = useState(null); // エラー状態追加
    const { id } = useParams(); // 追加

    useEffect(() => {
        const params = {
            token_id: id, // idを動的に取得
        };
    
        fetchFromApi({
          endpoint: '/api/item',
          params: params
        }).then((data) => {
          setItemDataApi(data); // 状態更新
          console.log("API returned data:", data);  
        }).catch(error => {
          console.error('Error fetching data:', error);
          setError(error); // エラー状態更新
        });
    
    }, [id]);
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="main">
            <Header />
            <Breadcrumb title="Item Details" subpage="ItemName"/>
            <ItemDetail data={itemDataApi} />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}

export default ItemDetails;
