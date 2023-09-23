import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../../utils/fetchFromApi';
import ModalReserve from '../Modal/ModalReserves';
import NFTCard from './Card';

const Account = () => {
    const [selectedItem, setSelectedItem] = useState({ id: "", title: "" });

    const handleItemSelected = (id, title) => {
        setSelectedItem({ id, title });
    };

    const [products, setProducts] = useState([]); 

    useEffect(() => {
        fetchFromApi({
            endpoint: '/api/user-nft-list'
        })
        .then((data) => {
            console.log("API returned data:", data);  
            setProducts(data); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const calculateCountdown = (targetDate) => {
        const currentDate = new Date();
        const timeDiff = targetDate - currentDate;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        return `${days} days ${hours} hrs ${minutes} mins ${seconds} secs remaining`;
    }

    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 90);

        const timer = setInterval(() => {
            const newCountdown = calculateCountdown(targetDate);
            setCountdown(newCountdown);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="profile-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro mb-4">
                            <div className="intro-content">
                                <span>NFT Assets</span>
                                <h3 className="mt-3 mb-0 silver-color">My Item Collection</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row items explore-items">
                    {products.length > 0 ? (
                        products.map((item, idx) => (
                            <NFTCard key={`edth_${idx}`} item={item} idx={idx} handleItemSelected={handleItemSelected} up_date={countdown} />
                        ))
                    ) : (
                        <div className="col-12 text-center mt-5">
                            <p>No items found in your collection.</p>
                        </div>
                    )}
                </div>
            </div>
            <ModalReserve selectedItem={selectedItem} />
        </section>
    );
}

export default Account;
