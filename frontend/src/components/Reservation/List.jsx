import React from 'react';
import { Link } from 'react-router-dom';



const ReservationList = ({ reservation, scan_address }) => {

  

  return (
    <ul className="list-unstyled">
      {reservation && reservation.map(item => {
      const formattedDate = new Date(item.created_at).toISOString().split('T')[0] + ' ' + new Date(item.created_at).toTimeString().split(' ')[0];
        return (
          <li key={item.product.token_id} className="single-tab-list d-flex align-items-center w100 mb-4">
            <Link to={`/item-details/${item.product.token_id}`}>
              <img className="avatar-lg" src={item.product.image} alt="" />
            </Link>
            <div className="reservation-content ml-4">
              <Link to={`/item-details/${item.product.token_id}`} className='d-inline h5'>
                <h5 className="mt-0 mb-2 ellipsis font-weight-normal">
                  {item.product.name}
                </h5>
              </Link>
              <p className="m-0">
              {item.store.city}│ {item.store.name}
              </p>
              <p className="m-0">Acceptance Date : {formattedDate}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ReservationList;
