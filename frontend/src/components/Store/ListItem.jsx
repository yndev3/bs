import React from 'react';
import { Link } from 'react-router-dom';

const StoreList = ({ store, scan_address }) => {
  return (
    <ul className="list-unstyled">
      {store && store.map(item => {

        return (
          <li key={item.product.token_id} className="single-tab-list d-flex align-items-center w100 mb-2">
            <Link to={`/item-details/${item.product.token_id}`}>
              <img className="avatar-lg" src={item.product.image} alt="" />
            </Link>
            <div className="store-content ml-4">
              <Link to={`/item-details/${item.product.token_id}`} className='d-inline h5'>
                <h5 className="mt-0 mb-2 ellipsis font-weight-normal">
                  {item.product.name}
                </h5>
              </Link>
              <p className="m-0">Purchased for <strong></strong> USDT</p>
              <p className="m-0">
                │ by BrandSwap
                <a 
                  href={`${scan_address}tx/${item.transaction_hash}`} 
                  className='d-inline'
                  target="_blank" 
                  rel="noopener noreferrer">
                  <i className="fas fa-external-link-alt ml-3" />
                </a>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default StoreList;
