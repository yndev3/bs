import React from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';

export const MaterialOption = ({ itemData }) => (
  <>
                        <p>
                          <span className="text-white h5">Optional</span>
                        </p>
                        <ul className="list-unstyled">
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">SerialNumber</span>
                              <span className="word-break">{itemData.option[0].serial_number}</span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span
                                  className="mr-3 text-white">Weight</span>
                              <span className="word-break">{itemData.option[0].weight}</span>
                            </li>
                          </ul>
  </>
);