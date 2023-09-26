import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFromApi } from '../../utils/fetchFromApi';
import StoreList from './ListItem'; 

const StoreArea = () => {

  const history = useHistory();
  const [store, setStore] = useState(null);
  const scan_address = process.env.REACT_APP_POLYGON_SCAN_ADDRESS;



  useEffect(() => {
    fetchFromApi({
      endpoint: '/api/purchase',
    })
      .then((data) => {
        // console.log('API returned data:', data);
        setStore(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        history.push('/error');
      });
  }, []);

  return (
    <section className="activity-area load-more">
      <div className="container w720">
        <div className="row">
          <div className="col-12">
            <div className="intro mb-4">
              <div className="intro-content">
                <span>Dashboard</span>
                <h3 className="mt-3 mb-0">Store List</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          <div className="col-12 col-md-6 col-lg-12">
            <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
              <li>
                <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                  <h5 className="m-0">Purchase</h5>
                </a>
              </li>
            </ul>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home">
                {store && store.length > 0 ? (
                  <StoreList store={store} scan_address={scan_address} />
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

export default StoreArea;
