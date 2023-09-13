import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
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
                <div className="accordion mt-5">
                  <Accordion  preExpanded={['a']}>
                    {/* Optional List */ }
                    {renderDynamicComponent()}
                    {/* Details List */ }
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Details
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
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
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
                </>
  );
};