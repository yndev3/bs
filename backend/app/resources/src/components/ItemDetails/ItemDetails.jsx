import React, { useEffect, useState } from 'react';
import { Required } from './Required';
import { OptionList } from './optionlist';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { fetchFromApi } from '../../utils/fetchFromApi';
import { useHistory, useParams } from 'react-router-dom';
import { OWNER_ADDRESS, POLYGON_SCAN_ADDRESS } from '../../helpers/constants';
import ItemForm from './form.jsx';

export default function Selling() {
  const [itemData, setItemData] = useState({});
  const [itemOwner, setItemOwner] = useState('Address not available');
  const {id} = useParams();
  const [prevId, setPrevId] = useState(null);
  const [splideImages, setSplideImages] = useState([]);
  const history = useHistory();

  const getItemOwner = (owner) => {
    return owner === OWNER_ADDRESS
        ? 'BrandSwap'
        : `${ owner.substring(0, 8) }...${ owner.substring(owner.length - 10) }`;
  };

  // Item States
  const setStatus = (isSale) => {
    const statusMap = {
      0: 'Not for Sale',
      1: 'On Sale',
      2: 'SOLD OUT',
    };
    return statusMap[isSale] || 'Unknown Status';
  };

  // Burn States
  const burnStatus = itemData.is_burn ? 'Burned' : 'Unburned';

  const fetchData = async () => {
    console.log('Fetching data from API...');
    try {
      return await fetchFromApi({endpoint: '/api/admin/item/' + id});
    } catch (err) {
      if (err.response && err.response.status === 404) {
        history.push('/error');
      }
      return null;  // エラーの場合、nullを返します
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (id !== prevId) {
        const data = await fetchData();
        if (data) { // fetchDataがエラーでnullを返した場合は更新しない
          setPrevId(id);
          setItemData(data);
          setItemOwner(getItemOwner(data.owner_address));
          setSplideImages(JSON.parse(data.image_list));
        }
      }
    };

    fetchDataAndUpdateState();
  }, [id, prevId, history]);

  return (

      <section className="item-details-area">
        <div className="container">
          <div className="col-12 intro mt-2 mt-lg-0 mb-5">
            <div className="intro-content">
              <span>Dashboard</span>
              <h3 className="mt-3 mb-0">Item Detail</h3>
              <hr className="white"/>
            </div>
          </div>
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

                {/* Item Price Change */ }
                <div className="card no-hover mb-2">
                  <p>
                    <span className="text-white h5">Owner</span>
                  </p>
                  <li className="price d-flex justify-content-between">
                    <span className="mr-3 text-white">By</span>
                    <a
                        href={ `${ POLYGON_SCAN_ADDRESS }address/${ itemData.owner_address }` }
                        target="_blank"
                        rel="noopener noreferrer">
                      <span className="word-break">{ itemOwner }</span>
                    </a>
                  </li>
                  <li className="price d-flex justify-content-between">
                    <span className="mr-3 text-white">Burn</span>
                    <span className="word-break">{ burnStatus }</span>
                  </li>
                  <li className="price d-flex justify-content-between">
                    <span className="mr-3 text-white">Sale</span>
                    <span className="word-break">{ setStatus(
                        itemData.is_sale) }</span>
                  </li>
                </div>

                {/* Item Price Change */ }
                { !itemData.is_burn && (
                    <ItemForm tokenId={ id } price={ itemData.price }
                              isSale={ itemData.is_sale }/>
                ) }
              </div>
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