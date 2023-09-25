import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../../utils/fetchFromApi';

const Explore = (props) => {
    const { initData, data } = props;
    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);

    useEffect(() => {
        const params = {
            sortKey: sortKey,
            sortOrder: sortOrder,
            category: 'Watch',
            brand: brand,
            page: currentPage,
            limit: 1000,
        };

        fetchFromApi({
            endpoint: '/api/items',
            params: params
        }).then((data) => {
            setProducts(data);
            console.log('API returned data:', data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });

    }, [currentPage, sortKey, sortOrder, category, brand]);

        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center mb-4">
                                <span>Exclusive Digital Assets</span>
                                <h3 className="mt-3 mb-0">{initData.heading}</h3>
                                <p>{initData.content}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-12">
                            {/* Explore Menu */}
                            <div className="sort-card explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                                {initData.filter.map((v, key) => (
                                    <label key={key} className={`btn d-table text-uppercase p-2 ${key === 0 ? 'active' : ''}`}>
                                        <input 
                                            type="radio"
                                            defaultValue={v} 
                                            defaultChecked={key === 0}
                                            className="explore-btn" />
                                        <span>{v}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="row items explore-items">
                        {data.map((item, idx) => {
                            return (
                                <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="card-img-top" src={item.img} alt="" />
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a href="/item-details">
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </a>
                                                <div className="seller align-items-center my-3">
                                                    <span>Brand by</span>
                                                    <a href="/author">
                                                        <h6 className="mb-0">{item.brand}</h6>
                                                    </a>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price} USDT</span>
                                                    <span>1 of 1</span>
                                                </div>
                                                <div className="col-12 text-center mt-2">
                                                    <a className="btn btn-bordered-white btn-smaller mt-3" href="/login"><i className="icon-handbag mr-2" />Place a Buy</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <a id="load-btn-watch" className="btn btn-bordered-white mt-5" href="#">{initData.btn_2}</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }


export default Explore;