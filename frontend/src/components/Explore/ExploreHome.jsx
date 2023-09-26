import React, { useEffect, useState } from 'react';
import { fetchFromApi } from '../../utils/fetchFromApi';
import Card from '../Item/Card';
import { Link } from 'react-router-dom';

const ExploreHome = (props) => {
  const { category } = props;
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const params = {
      sortKey: sortKey,
      sortOrder: sortOrder,
      category: category,
      limit: 4,
    };

    fetchFromApi({
      endpoint: '/api/items',
      params: params
    }).then((data) => {
      setProducts(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });

  }, [sortKey, sortOrder, category]);

  return (
      <section className="explore-area load-more p-0 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>Assets NFT</span>
                  <h3 className="mt-3 mb-0">{ props.heading }</h3>
                </div>
                <div className="intro-btn">
                  {products.length > 0 && <Link className="btn content-btn" to={props.linkTo} >View All</Link>}
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            { products.length > 0 ? (
              products.map((item) => {
                return <Card key={ item.id } item={ item }/>;
              })
            ) : (
              <div className="col-12">
                <p className="text-center mt-5 mb-5">No items found. Please check back later.</p>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-12 text-center">
              {products.length > 0 && (
                <Link to={props.linkTo} className="btn btn-bordered-white mt-5">
                  View All
                  <i className="fa fa-arrow-circle-right ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
  );
};

export default ExploreHome;
