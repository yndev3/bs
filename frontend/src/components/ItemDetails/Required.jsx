import React from 'react';

export const Required = ({ itemData }) => (
  <>
  <p>
    <span className="text-white h5">Description</span><br/>
    <span className="h6">{itemData.description}</span>
  </p>
  <div className="item-info-list mt-4">
    <ul className="list-unstyled">
          <li className="price d-flex justify-content-between">
            <span className="mr-3 text-white">Category</span>
            <span className="word-break">{itemData.category}</span>
          </li>
          <li className="price d-flex justify-content-between">
            <span className="mr-3 text-white">Brand</span>
            <span className="word-break">{itemData.brand}</span>
          </li>
          <li className="price d-flex justify-content-between">
            <span className="mr-3 text-white">Color</span>
            <span className="word-break">{itemData.color}</span>
          </li>
          <li className="price d-flex justify-content-between">
            <span className="mr-3 text-white">Material</span>
            <span className="word-break">{itemData.material}</span>
          </li>
          <li className="price d-flex justify-content-between">
            <span className="mr-3 text-white">Size</span>
            <span className="word-break">{itemData.size}</span>
          </li>
          <li className="price d-flex justify-content-between">
            <span className="mr-3 text-white">Accessories</span>
            <span className="word-break">{itemData.accessories}</span>
          </li>
    </ul>
  </div>
  </>
);