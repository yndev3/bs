import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { ethers } from 'ethers';
import Marketplace from '../../contracts/Marketplace.json';
import BrandSwap from '../../contracts/BrandSwap.json';
import ERC20 from '../../contracts/erc20.abi.json';

export default function Selling(itemDataApi) {
  const BrandSwapAddress = '0x0B306BF915C4d645ff596e518fAf3F9669b97016';
  const marketplaceAddress = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE';
  const TXT = '0x68B1D87F95878fE05B998F19b66F4baba5De1aed';
  let isAdmin = true;
  const [itemData, setItemData] = useState({});
  

  const requiredLoop = [
    'Brand',
    'State',
    'Weight',
    'Color',
    'Material',
    'Size',
    'Accessories',
  ];

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
  console.log("API returned data:", itemDataApi);  
  useEffect(() => {
    // todo APIから取得する想定
    setItemData({
      ContractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      tokenId: '1',
      Category: 'Watch',
      title: 'Walking On AirWalking On AirWalking On Air',
      price: '1,000',
      images: [
        '/img/Watches.jpg',
        '/img/Jewelrys.jpg',
        '/img/Materials.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/Jewelrys.jpg',
        '/img/Materials.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
        '/img/auction_2.jpg',
      ],
      Brand: 'ROLEX',
      State: 'Brand new',
      Weight: '500',
      Color: 'Black/Silver',
      Material: 'ROLEX',
      Size: '100*30*20',
      Accessories: 'Box, manual,Box, manual,Box',
      created: '15 Jul 2021',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.',
      price_1: '1.5 ETH',
      price_2: '$500.89',
      count: '1 of 5',
      size: '14000 x 14000 px',
      volume: '64.1',
    });
  }, []);

  return (
      <section className="item-details-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <h3 className="mt-0">{ itemData.title }</h3>
                <div className="item-thumb text-center">
                  <Splide aria-label="itemImg">
                    { itemData.images?.map((image, key) => {
                      return (
                          <SplideSlide key={ key }>
                            <img src={ image } alt={ `item_${ key }_image` }/>
                          </SplideSlide>
                      );
                    })
                    }
                  </Splide>
                </div>
              </div>
              <div className="col-12 item px-lg-2 mt-3">
                <div className="card no-hover">
                  <div
                      className="price d-flex justify-content-between align-items-center">
                    <span>Price</span>
                    <span>1 of 1</span>
                  </div>
                  {
                    isAdmin
                        ?
                        <form className="card-body p-0"
                              onSubmit={ handleSubmit }>
                          <div className="form-group mt-3">
                            <input id="price" type="number"
                                   className="form-control" name="price"
                                   required/>
                            <input type="hidden" className="form-control"
                                   name="tokenId" value={ itemData.tokenId }/>
                          </div>
                          <button
                              className="btn btn-bordered-white w-100 mt-3"
                              type="submit">Sale
                          </button>
                        </form>
                        : <h4 className="mt-0 mb-2">{ itemData.price }<span
                            className="h6"> USDT</span></h4>
                  }
                </div>
              </div>
              <a className="d-block btn btn-bordered-white mt-4"
                 href="#">
                getMarket
              </a>

              <a className="d-block btn btn-bordered-white mt-4"
                 href="#"
                 onClick={ handleBuy }>
                buy
              </a>
            </div>

            {/* Right column*/ }
            <div className="col-12 col-lg-6">
              {/* Content */ }
              <div className="content mt-5 mt-lg-0">
                {/* Description */ }
                <p>
                  <span className="text-white h5">Description</span><br/>
                  <span className="h6">{ itemData.content }</span>
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
        </div>
      </section>
  );
}