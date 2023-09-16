import React, { useEffect, useState } from 'react';

import { Required } from './Required';
import { OptionList } from './optionlist';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ethers } from 'ethers';
import Marketplace from '../../contracts/Marketplace.json';
import BrandSwap from '../../contracts/BrandSwap.json';
import ERC20 from '../../contracts/erc20.abi.json';

import { fetchFromApi } from '../../utils/fetchFromApi';
import { useParams } from 'react-router-dom';


export default function Selling() {
  const BrandSwapAddress = '0x0B306BF915C4d645ff596e518fAf3F9669b97016';
  const marketplaceAddress = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE';
  const brandSwapMintAddress = import.meta.env.VITE_BRANDSWAP_MINT_ADDRESS;
  const TXT = '0x68B1D87F95878fE05B998F19b66F4baba5De1aed';
  const scan_address = import.meta.env.VITE_POLYGON_SCAN_ADDRESS
  const [itemData, setItemData] = useState({});
  console.log(`scan: ${ scan_address }`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = ethers.utils.parseEther(e.target.price.value);
    const tokenId = e.target.tokenId.value;

    try {
      const market = await connectMarket();
      const tx = await market.setTokenContract(TXT);
      const marketTx = await market.setSale(
          tokenId,
          price,
          true,
      );
      const {seller, amount, isSale} = await marketTx.wait();
      console.log(`getMarket seller: ${ seller }`);
      console.log(`getMarket amount: ${ amount }`);
      console.log(`getMarket isSale: ${ isSale }`);

      const mintContract = await connectMintContract();
      const mintTX = await mintContract.setApprovalForAll(
          marketplaceAddress,
          true,
      );
      console.dir(`getMarket mintTX: ${ mintTX }`);
    } catch (error) {
      console.log(error);
    }
  };

  const connectERC20Contract = async (signer) => {
    try {
      return new ethers.Contract(
          TXT,
          ERC20,
          signer,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectMarket = async () => {
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
        marketplaceAddress,
        Marketplace.abi,
        await signer,
    );
  };

  const connectMintContract = async () => {
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
        BrandSwapAddress,
        BrandSwap.abi,
        await signer,
    );
  };

  const handleBuy = async (e) => {
    e.preventDefault();

    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const account = await signer.getAddress();

    // Connecting to the marketplace
    const market = await connectMarket();

    // Fetch the sale data
    const sale = await market.getSale(itemData.tokenId);
    if (!sale.isSale) {
      throw new Error('The token is not for sale');
    }

    const erc20 = await connectERC20Contract(signer);
    const balance = await erc20.balanceOf(account);
    console.log(`Balance: ${ balance.toString() }`);

    if (balance.lt(sale.price)) {
      throw new Error('Insufficient balance for the purchase');
    }

    // Approve the exact price of the NFT
    const approveTx = await erc20.approve(marketplaceAddress, sale.price);
    await approveTx.wait();

    // Purchase the NFT with the ERC20 token
    const tx = await market.buyWithERC20(itemData.tokenId, sale.price, TXT);
    console.log(tx);
    // listen to the event when the transaction is confirmed and the NFT is transferred
    const {seller, buyer, price, tokenId} = await tx.wait();
    // ethers.on('TokenSold', (tokenId, sender, payment, token) => {
    //   console.log(`TokenSold tokenId: ${ tokenId }`);
    //   console.log(`TokenSold sender: ${ sender }`);
    //   console.log(`TokenSold payment: ${ payment }`);
    //   console.log(`TokenSold token: ${ token }`);
    // });
  };
  
  // API

  const [itemDataApi, setItemDataApi] = useState(null); 
  const [error, setError] = useState(null); 
  const { id } = useParams(); 
  const [prevId, setPrevId] = useState(null);

  useEffect(() => {
    console.log(`Current id: ${id}, Previous id: ${prevId}`);
  
    if (id !== prevId) {
      console.log('Fetching data from API...');
  
      const fetchData = async () => {
        try {
          const data = await fetchFromApi({
            endpoint: '/api/item',
            params: { token_id: id },
          });
  
          setPrevId(id);
          setItemDataApi(data);
  
          console.log("API returned data:", data);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(err);
        }
      };
  
      fetchData();
    }
  }, [id]);

  // Splide image list

  useEffect(() => {
    if (itemDataApi) {  
      setItemData(itemDataApi); 
    }
  }, [itemDataApi]);

  const [splideImages, setSplideImages] = useState([]); 

  useEffect(() => {
    if (itemDataApi) {
      const otherImages = JSON.parse(itemDataApi.image_list);
      setSplideImages(otherImages); 
    }
  }, [itemDataApi]);

  // owner_address

  let outputAddress = 'Address not available';

  if (itemData?.owner_address) {
    if (itemData.owner_address === brandSwapMintAddress) {
      outputAddress = 'BrandSwap';
    } else {
      outputAddress = `${itemData.owner_address.substring(0, 8)}...${itemData.owner_address.substring(itemData.owner_address.length - 10)}`;
    }
  }

  // Price toLocaleString

  const formattedPrice = itemData && itemData.price ? itemData.price.toLocaleString() : "Not Sale";

  // Item States

  let saleStatus;

  if (itemData.is_sale === 1) {
    saleStatus = "For Sale";
  } else if (itemData.is_sale === 0) {
    saleStatus = "Not for Sale";
  } else if (itemData.is_sale === 2) {
    saleStatus = "SOLD";
  } else {
    // 1, 2, 3以外の場合のデフォルト値を指定できます
    saleStatus = "Unknown Status";
  }

  // Burn States

  const burnStatus = itemData.is_burn === 1 ? "Burned" : "Unburned";
  
  return (

      <section className="item-details-area">
        <div className="container">
          <div className="col-12 intro mt-2 mt-lg-0 mb-5">
              <div className="intro-content">
                <span>Dashboard</span>
                <h3 className="mt-3 mb-0">Item Detail</h3>
                <hr className='white' />
              </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-12">
                <div className="item-info">
                  <h3 className="mt-0">{itemData.name}</h3>
                </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <div className="item-thumb text-center">
                  <Splide aria-label="itemImg">
                    { 
                      splideImages.map((image, key) => {
                        return (
                          <SplideSlide key={key}>
                            <img src={image} alt={`item_${key}_image`} />
                          </SplideSlide>
                        );
                      })
                    }
                  </Splide>
                </div>
              </div>
              <div className="col-12 item px-lg-2 mt-3">

              {/* Item Price Change */}                
              <div className="card no-hover mb-2">  
                <p>
                  <span className="text-white h5">Owner</span>        
                </p>
                {/* Required List */ }
                
                <div className="item-info-list mt-4">
                  <ul className="list-unstyled">
                    { requiredLoop.map((key) => (
                        <li className="price d-flex justify-content-between"
                            key={ key }>
                          <span className="mr-3 text-white">{ key }</span>
                          <span
                              className="word-break">{ itemData[key] }</span>
                        </li>
                    )) }
                  </ul>
                </div>
                {/* Item Info List */ }
                <div className="accordion mt-5">
                  <Accordion allowZeroExpanded>
                    {/* Optional List */ }
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Optional
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          Exercitation in fugiat est ut ad ea cupidatat ut in
                          cupidatat occaecat ut occaecat consequat est minim
                          minim
                          esse tempor laborum consequat esse adipisicing eu
                          reprehenderit enim.
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    {/* Details List */ }
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          Details
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p>
                          <ul className="list-unstyled">
                            <li className="price d-flex justify-content-between">
                              <span
                                  className="mr-3 text-white">Contract Address</span>
                              <span className="word-break">
                                <a href={ `https://etherscan.io/address/${ itemData.ContractAddress }` }
                                   target="_blank">{ itemData.ContractAddress }</a>
                              </span>
                            </li>
                            <li className="price d-flex justify-content-between">
                              <span className="mr-3 text-white">Token ID</span>
                              <span className="word-break">
                                <a href="https://ipfs.io/ipfs/QmeifaBHYmARgCDU2ZnzajKNEsAyAYgz67g25c9KkbcR5y/2657.json"
                                   target="_blank">1234</a>
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
                        </p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>

          {/* Right column*/ }
          <div className="col-12 col-lg-6">
            {/* Content */ }
            <div className="content mt-5 mt-lg-0">

              {/* Required List */ }
              <Required itemData={itemData} />
              {/* Item Info List */ }
              <OptionList itemData={itemData} />
            </div>
          </div>

          </div>
        </div>
      </section>
  );
}