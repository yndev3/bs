import React, { useState } from 'react';
import ListItem from './ListItem'; 

const ActivityArea = () => {

  const scan_address = process.env.REACT_APP_POLYGON_SCAN_ADDRESS;

  const [tabData_1] = useState([
    {
      token_id: '1',
      title: 'Item 1 sampleNama sampleNama sampleNama sampleNama sampleNama sampleNama',
      img: "/img/auction_6.jpg",
      price: '100',
      tx_id:'XXXXXXXXXXXXXXXX'
    },
    {
      token_id: '2',
      title: 'Item 2',
      img: "/img/auction_6.jpg",
      price: '100',
      tx_id:'XXXXXXXXXXXXXXXX'
    },
    {
      token_id: '3',
      title: 'Item 3',
      img: "/img/auction_6.jpg",
      price: '100',
      tx_id:'XXXXXXXXXXXXXXXX'
    }
  ]);

  return (
    <section className="activity-area load-more">
      <div className="container w720">
        <div className="row">
          <div className="col-12">
            <div className="intro mb-4">
              <div className="intro-content">
                <span>Dashboard</span>
                <h3 className="mt-3 mb-0">Activity</h3>
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
                <ul className="list-unstyled">
                  {tabData_1.map((item, idx) => (
                    <ListItem item={item} idx={idx} scan_address={scan_address} />  
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityArea;
