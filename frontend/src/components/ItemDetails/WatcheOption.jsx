import React from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';

export const WatcheOption = ({ itemData }) => (
  <>
                        <p>
                          <span className="text-white h5">Optional</span>
                        </p>
                        <ul className="list-unstyled">
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">State</span>
                              <span className="word-break">{itemData.option[0].state}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">SerialNumber</span>
                              <span className="word-break">{itemData.option[0].serial_number}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span
                                  className="mr-3 text-white">Movement</span>
                              <span className="word-break">{itemData.option[0].movement}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Gender</span>
                              <span className="word-break">{itemData.option[0].gender}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Features</span>
                              <span className="word-break">{itemData.option[0].features}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span
                                  className="mr-3 text-white">Edition</span>
                              <span className="word-break">{itemData.option[0].edition}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Waterproof</span>
                              <span className="word-break">{itemData.option[0].water_proof}</span>
                            </li>

                          </ul>

  </>
);