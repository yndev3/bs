import React from 'react';

export const JewelryOption = ({ itemData }) => (
  <>                    
                        <hr className='white' />
                        <p>
                        <span className="text-white h5">Optional</span>
                        </p>
                        <ul className="list-unstyled">
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">State</span>
                              <span className="word-break">{itemData.option[0].state}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Gender</span>
                              <span className="word-break">{itemData.option[0].gender}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span
                                  className="mr-3 text-white">Weight</span>
                              <span className="word-break">{itemData.option[0].weight}</span>
                            </li>
                          </ul>
  </>
);