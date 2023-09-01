import React, { useEffect, useState } from 'react';
import { fetchFromApi } from '../../utils/fetchFromApi';
import Card from '../Item/Card';

const ExploreWatches = (props) => {
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
      limit: 4,
    };

    fetchFromApi({
      endpoint: '/api/item-limit',
      params: params
    }).then((data) => {
      setProducts(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });

  }, [currentPage, sortKey, sortOrder, category, brand]);

  return (
      <section className="explore-area load-more p-0 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */ }
              <div
                  className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>Assets NFT</span>
                  <h3 className="mt-3 mb-0">{ props.heading }</h3>
                </div>
                <div className="intro-btn">
                  <a className="btn content-btn" href="/item-list">View
                    All</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            { products.map((item) => {
              return <Card key={ item.id } item={ item }/>;
            }) }
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <a className="btn btn-bordered-white mt-5"
                 href="/item-list">
                View All
              </a>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ExploreWatches;