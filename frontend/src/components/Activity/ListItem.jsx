import React from 'react';
import { Link } from 'react-router-dom';

const ActivityList = ({ activity, scan_address }) => {
  return (
    <ul className="list-unstyled">
      {activity && activity.map(item => {

        const createdAt = new Date(item.created_at);
        const now = new Date();
        const diffInMilliseconds = now - createdAt;
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);
        let timeAgo = '';

        if (diffInDays > 0) {
          timeAgo = `<strong>${diffInDays}</strong> days <strong>${diffInHours % 24}</strong> hours ago`;
        } else {
          timeAgo = `<strong>${diffInHours}</strong> hours ago`;
        }

        return (
          <li key={item.product.token_id} className="single-tab-list d-flex align-items-center w100 mb-2">
            <Link to={`/item-details/${item.product.token_id}`}>
              <img className="avatar-lg" src={item.product.image} alt="" />
            </Link>
            <div className="activity-content ml-4">
              <Link to={`/item-details/${item.product.token_id}`} className='d-inline h5'>
                <h5 className="mt-0 mb-2 ellipsis font-weight-normal">
                  {item.product.name}
                </h5>
              </Link>
              <p className="m-0">Purchased for <strong>{Number(item.price).toLocaleString()}</strong> USDT</p>
              <p className="m-0">
              <span className="m-0" dangerouslySetInnerHTML={{ __html: ` ${timeAgo}` }} /> │ by BrandSwap
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

export default ActivityList;
