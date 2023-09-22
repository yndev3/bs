import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Required } from './Required';
import { OptionList } from './optionlist';
import ModalBuyButton from '../Modal/ModalBuyButton';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {
  OWNER_ADDRESS,
  POLYGON_SCAN_ADDRESS
} from '../../helpers/constants';
import { fetchFromApi } from '../../utils/fetchFromApi';
import { useParams } from 'react-router-dom';

export default function Selling() {
  const [itemData, setItemData] = useState({});
  const {isConnected} = useAccount();
  const history = useHistory();
  const [itemDataApi, setItemDataApi] = useState(null);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const [prevId, setPrevId] = useState(null);
  const [splideImages, setSplideImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFromApi({
          endpoint: '/api/item',
          params: {token_id: id},
        });

        setPrevId(id);
        setItemDataApi(data);

        // console.log('API returned data:', data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        history.push('/error');
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
    if (itemData.owner_address === OWNER_ADDRESS) {
      outputAddress = 'BrandSwap';
    } else {
      outputAddress = `${ itemData.owner_address.substring(0,
          5) }...${ itemData.owner_address.substring(
          itemData.owner_address.length - 6) }`;
    }
  }

  // Price toLocaleString

  const formattedPrice = itemData && itemData.price
      ? itemData.price.toLocaleString()
      : 'Price not available';

  // Item States

  const saleStatus = itemData.is_sale === 1 ? 'For Sale' : 'Not for Sale';

  return (

      <section className="item-details-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="item-info">
                <h3 className="mt-0">{ itemData.name }</h3>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <div className="item-thumb text-center">
                  <Splide aria-label="itemImg">
                    {
                      splideImages.map((image, key) => {
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
                  { itemData.is_sale === 1 && itemData.is_burn === 0 ? (
                      <div
                          className="price d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mt-0 mb-2">
                          <img className="mr-3"
                               src="../img/tether-usdt-logo.png" alt="usdtlogo"
                               width="30px"/>
                          { formattedPrice }<span className="h6"> USDT</span>
                        </h4>
                        <span>1 of 1</span>
                      </div>
                  ) : null }
                  <li className="price d-flex justify-content-between">
                    <span className="mr-3 text-white">Owned By</span>
                    <a
                        href={ `${ POLYGON_SCAN_ADDRESS }address/${ itemData.owner_address }` }
                        target="_blank"
                        rel="noopener noreferrer">
                      <span className="word-break">{ outputAddress }</span>
                    </a>
                  </li>
                  <li className="price d-flex justify-content-between">
                    <span className="mr-3 text-white">Status</span>
                    <span className="word-break">{ saleStatus }</span>
                  </li>


                  { isConnected ? (
                      <div className="col-12 text-center mt-2">
                        <Link
                            className="btn btn-bordered-white btn-smaller mt-3"
                            to="#"
                            data-toggle="modal"
                            data-target="#buybutton"
                        >
                          <i className="icon-handbag mr-2"/>Confirm
                          Purchase</Link>
                      </div>
                  ) : (
                      <div className="col-12 align-self-center">
                        <Link
                            className="d-block btn btn-bordered-white mt-4"
                            to="/wallet-connect"
                        >
                          <i className="icon-wallet mr-md-2"/>Wallet Connect
                        </Link>
                      </div>
                  ) }

                </div>
              </div>
              <ModalBuyButton id={ id } itemData={ itemData }/>
            </div>

            {/* Right column*/ }
            <div className="col-12 col-lg-6">
              {/* Content */ }
              <div className="content mt-5 mt-lg-0">

                {/* Required List */ }
                <Required itemData={ itemData }/>
                {/* Item Info List */ }
                <OptionList itemData={ itemData }/>
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}