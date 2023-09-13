import React from 'react';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';

export const MaterialOption = ({ itemData }) => (
  <>
                    <AccordionItem uuid="a">
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Optional
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
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
                      </AccordionItemPanel>
                    </AccordionItem>
  </>
);