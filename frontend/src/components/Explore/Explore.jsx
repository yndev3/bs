import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFromApi } from '../../utils/fetchFromApi';
import Card from '../Item/Card';
import SortIcon from '@mui/icons-material/Sort';


const Explore = (props) => {
    const { initData, category } = props;
    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [visibleCount, setVisibleCount] = useState(8); 
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('ALL');
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 8); 
    };

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
        setVisibleCount(8);
    };

    const filteredProducts = products.filter(item => selectedBrand === 'ALL' || item.brand === selectedBrand);

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
            const brandCounts = res.data.reduce((acc, item) => {
                acc[item.brand] = (acc[item.brand] || 0) + 1;
                return acc;
            }, {});
            setBrands(brandCounts);
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
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end align-items-center">
                            {/* Accordion Trigger */}
                            <div className="accordion-trigger" onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
                                <span>Brands</span>
                            </div>
                            
                            {/* Sort Select Box */}
                            <select 
                                className="form-select" 
                                onChange={(e) => {
                                    const [key, order] = e.target.value.split('-');
                                    setSortKey(key);
                                    setSortOrder(order);
                                }}
                                style={{ 
                                    width: '135px', 
                                    borderRadius: '5px', 
                                    borderColor: 'grey', 
                                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)' 
                                }}
                            >
                                <option value="" disabled selected>Sort...<SortIcon /></option>
                                <option value="id-desc">Newest First</option>
                                <option value="id-asc">Oldest First</option>
                                <option value="price-asc">Cheapest First</option>
                                <option value="price-desc">Most Expensive First</option>
                            </select>
                        </div>
                        {/* Explore Menu */}
                        {isAccordionOpen && (
                            <div className="col-12">
                                <div className="sort-card explore-menu btn-group btn-group-toggle flex-wrap text-left mb-4" data-toggle="buttons">
                                    <label className={`btn d-table text-uppercase p-2 ${selectedBrand === 'ALL' ? 'active' : ''}`} onClick={() => handleBrandClick('ALL')} style={{flexGrow: 0}}> 
                                        <input 
                                            type="radio"
                                            defaultValue='ALL' 
                                            defaultChecked={selectedBrand === 'ALL'}
                                            className="explore-btn" />
                                        <span>ALL ({products.length})</span>
                                    </label>
                                    {Object.entries(brands).map(([brand, count], key) => (
                                        <label key={key} className={`btn d-table text-uppercase p-2 mr-1${brand === selectedBrand ? 'active' : ''}`} onClick={() => handleBrandClick(brand)} style={{flexGrow: 0}}>
                                            <input 
                                                type="radio"
                                                defaultValue={brand} 
                                                defaultChecked={brand === selectedBrand}
                                                className="explore-btn" />
                                            <span>{brand} ({count})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="row items explore-items">
                        { filteredProducts.slice(0, visibleCount).map((item) => {
                            return <Card key={ item.id } item={ item }/>;
                        }) }
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            { visibleCount < filteredProducts.length && (
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