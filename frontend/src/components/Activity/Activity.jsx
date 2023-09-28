import React, { useState, useEffect } from 'react';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import ActivityList from './ListItem'; 

const ActivityArea = () => {
  const { fetchFromApi, error:apiError, loading:isApiLoading} = useFetchFromApi();

  const [activity, setActivity] = useState(null);
  const scan_address = process.env.REACT_APP_POLYGON_SCAN_ADDRESS;
  const [error, setError] = useState(null);

  const now = new Date();

  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/purchase',
    })
      .then((data) => {
        // console.log('API returned data:', data);
        setActivity(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  return (
    <section className="activity-area load-more">
      <div className="container w720">
        <div className="row items">
          <div className="col-12 col-md-6 col-lg-12">
            {/* ERROR */ }
            { error && 
              <ul className="mb-5 post-holder">
                <li className="post-meta-item">
                    <div className="date">
                        <span className="posted-on">ERROR ALERT : { error.message }</span>
                    </div>
                </li>
              </ul>
            }
            <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
              <li>
                <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                  <h5 className="m-0">Purchase</h5>
                </a>
              </li>
            </ul>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home">
                {activity && activity.length > 0 ? (
                  <ActivityList activity={activity} scan_address={scan_address} />
                ) : (
                  <div className="col-12 text-center mt-5">
                    <p>No items found in your collection.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityArea;
