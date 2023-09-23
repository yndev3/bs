import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  const BrandSwapAddress = import.meta.env.VITE_BRANDSWAP_ADDRESS;
  const marketplaceAddress = import.meta.env.VITE_SELLING_ADDRESS;
  const brandSwapMintAddress = import.meta.env.VITE_BRANDSWAP_MINT_ADDRESS;
  const TXT = import.meta.env.VITE_ERC20_ADDRESS;
  const scan_address = import.meta.env.VITE_POLYGON_SCAN_ADDRESS
  const [itemData, setItemData] = useState({});
  const [itemDataApi, setItemDataApi] = useState(null); // 状態追加
  const [error, setError] = useState(null); // エラー状態追加
  const { id } = useParams(); // 追加
  const [prevId, setPrevId] = useState(null);
  const [splideImages, setSplideImages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = ethers.utils.parseEther(e.target.price.value);

    try {
      const market = await connectMarket();
      const tx = await market.setTokenContract(TXT);
      const marketTx = await market.setSale(
          id,
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
    const sale = await market.getSale(id);
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
    const tx = await market.buyWithERC20(id, sale.price, TXT);
  };

useEffect(() => {
  const fetchData = async () => {
    console.log('Fetching data from API...');
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

  if (id !== prevId) {
    fetchData();
  }

  if (itemDataApi) {
    setItemData(itemDataApi);
    const otherImages = JSON.parse(itemDataApi.image_list);
    setSplideImages(otherImages);
  }
}, [id, itemDataApi]);


  // owner_address

  let outputAddress = 'Address not available';

  if (itemData?.owner_address) {
    if (itemData.owner_address === brandSwapMintAddress) {
      outputAddress = 'BrandSwap';
    } else {
      outputAddress = `${itemData.owner_address.substring(0, 8)}...${itemData.owner_address.substring(itemData.owner_address.length - 10)}`;
    }
  }

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
                <li className="price d-flex justify-content-between">
                  <span className="mr-3 text-white">By</span>
                  <a
                    href={`${scan_address}address/${itemData.owner_address}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <span className="word-break">{outputAddress}</span>
                  </a>
                </li>
                <li className="price d-flex justify-content-between">
                  <span className="mr-3 text-white">Burn</span>
                  <span className="word-break">{burnStatus}</span>
                </li>
              </div>

              {/* Item Price Change */}
              {(itemData.is_sale === 0 || itemData.is_sale === 1) && itemData.is_burn === 0 && (
              <div className="card no-hover mb-2">
                <p>
                  <span className="text-white h5">Price Change</span>
                </p>
                <div className='form-inline'>
                  <div className="form-group">
                    <div className="price d-flex justify-content-between align-items-center">
                      <input
                        type='text'
                        defaultValue={ itemData.price }
                        className='mr-3'
                        style={{ width: '200px' }}
                      /> USDT
                      <Link
                        className="btn btn-bordered-white btn-smaller ml-3"
                        to="#"
                        data-toggle="modal"
                        data-target="#buybutton"
                        >
                        Change
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              )}

              <div className="card no-hover">
                <li className="price d-flex justify-content-between">
                  <span className="mr-3 text-white">Status</span>
                  <span className="word-break">{saleStatus}</span>
                </li>
                <div className="col-12 text-center">
                {itemData.is_sale === 0 && itemData.is_burn === 0 && (
                  <Link
                      className="btn btn-bordered-white btn-smaller mt-3"
                      to="#"
                      data-toggle="modal"
                      data-target="#buybutton"
                      >Start Sale
                  </Link>
                )}
                {itemData.is_sale === 1 && itemData.is_burn === 0 && (
                  <Link
                      className="btn btn-bordered-white btn-smaller mt-3"
                      to="#"
                      data-toggle="modal"
                      data-target="#buybutton"
                      >Stop Sale
                  </Link>
                  )}
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