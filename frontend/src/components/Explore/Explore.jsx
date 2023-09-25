import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFromApi } from '../../utils/fetchFromApi';
import Card from '../Item/Card';

const Explore = (props) => {
    const { initData, category } = props;
    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [visibleCount, setVisibleCount] = useState(8); 

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 8); 
    };

    useEffect(() => {
        const params = {
            sortKey: sortKey,
            sortOrder: sortOrder,
            category: category,
        };
        fetchFromApi({
            endpoint: '/api/items',
            params: params
        }).then((res) => {
            setProducts(res.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [sortKey, sortOrder, category]);

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
                        { products.slice(0, visibleCount).map((item) => {
                            return <Card key={ item.id } item={ item }/>;
                        }) }
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            { visibleCount < products.length && (
                                <button id="load-btn-watch" className="btn btn-bordered-white mt-5" onClick={loadMore}>
                                    {initData.btn_2}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }


export default Explore;