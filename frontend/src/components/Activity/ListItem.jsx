import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon'; // Luxonライブラリをインポート

const ActivityList = ({ activity, scan_address }) => {
  return (
    <ul className="list-unstyled">
      {activity && activity.map(item => {

        const createdDate = DateTime.fromISO(item.created_at); // Luxonを使用して日付をパース
        const now = DateTime.now(); // 現在の日時を取得
        const diff = now.diff(createdDate, ['days', 'hours', 'minutes']).toObject(); // 日付の差を計算

        let timeAgo = '';
        if (diff.days && diff.days > 0) {
          timeAgo = `<strong>${Math.floor(diff.days)}</strong> days <strong>${Math.floor(diff.hours) || 0}</strong> hours ago`;
        } else if (diff.hours && diff.hours > 0) {
          timeAgo = `<strong>${Math.floor(diff.hours)}</strong> hours ago`;
        } else if (diff.minutes && diff.minutes > 0) {
          timeAgo = `<strong>${Math.floor(diff.minutes)}</strong> minutes ago`;
        } else {
          timeAgo = 'Just now';
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
                <span className="m-0" dangerouslySetInnerHTML={{ __html: timeAgo }} /> │ by BrandSwap
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
