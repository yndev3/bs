import React from 'react';

import 'react-accessible-accordion/dist/fancy-example.css';
import { WatcheOption } from './WatcheOption'; 
import { JewelryOption } from './JewelryOption';
import { MaterialOption } from './MaterialOption';

export const OptionList = ({ itemData }) => {

  const renderDynamicComponent = () => {
    switch (itemData.category) {
      case 'Watch':
        return <WatcheOption itemData={itemData} />;
      case 'Jewelry':
        return <JewelryOption itemData={itemData} />;
      case 'Material':
        return <MaterialOption itemData={itemData} />;
      default:
        return null;
    }
  };

  return (
  <>
                <div className="accordion mt-3">
                    {/* Optional List */ }
                    <hr className='white' />
                    {renderDynamicComponent()}
                    {/* Details List */ }
                    <hr className='white' />
                        <p className='mt-5'>
                        <span className="text-white h5">Detail</span>
                        </p>
                          <ul className="list-unstyled">
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Token ID</span>
                              <span className="word-break">
                                {itemData.token_id}
                              </span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span
                                  className="mr-3 text-white">Token Standard</span>
                              <span className="word-break">ERC-721</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Chain</span>
                              <span className="word-break">Polygon</span>
                            </li>
                          </ul>
                </div>
                </>
  );
};