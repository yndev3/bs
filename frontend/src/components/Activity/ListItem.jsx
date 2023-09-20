import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ item, idx, scan_address }) => (
  <li key={`ato_${idx}`} className="single-tab-list d-flex align-items-center w100">
    <a href="/item-details">
      <img className="avatar-lg" src={item.img} alt="" />
    </a>
    <div className="activity-content ml-4">
      <a href="/item-details">
        <h5 className="mt-0 mb-2 ellipsis ">
          <strong>
            <Link 
              to={`/item-details/${item.token_id}`}
              className='d-inline h5'
            >
              {item.title}
            </Link>
          </strong>
        </h5>
      </a>
      <p className="m-0">Purchased for <strong>{item.price} USDT</strong></p>
      <p className="m-0">
          by BrandSwap
          <a 
              href={`${scan_address}tx/${item.tx_id}`} 
              className='d-inline'
              target="_blank" 
              rel="noopener noreferrer">
              <i className="fas fa-external-link-alt ml-3" />
          </a>
      </p>
    </div>
  </li>
);

export default ListItem;
