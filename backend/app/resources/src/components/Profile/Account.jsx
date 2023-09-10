import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../../utils/fetchFromApi';
import ModalReserve from '../Modal/ModalReserves';
import NFTCard from '../Profile/Card';


const Account = ({ initData, data }) => {
    const [selectedItem, setSelectedItem] = useState({ id: "", title: "" });

    const handleItemSelected = (id, title) => {
    setSelectedItem({ id, title });
    };

    const [products, setProducts] = useState([]); // 新しい状態変数を追加
    useEffect(() => {
        fetchFromApi({
          endpoint: '/api/user-nft-list'
        })
        .then((data) => {
          console.log("API returned data:", data);  
          setProducts(data); // データを設定
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }, []);

    return (
        <section className="explore-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro mb-4">
                            <div className="intro-content">
                                <span>NFT Assets</span>
                                <h3 className="mt-3 mb-0 silver-color">{initData.heading}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row items explore-items">
                {products.map((item, idx) => (
                    <NFTCard key={`edth_${idx}`} item={item} idx={idx} handleItemSelected={handleItemSelected} />
                ))}
                </div>
            </div>
            <ModalReserve selectedItem={selectedItem} />
        </section>
    );
}

export default Account;
