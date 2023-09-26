import React, { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import {
  SELLING_ABI,
  SELLING_CONTRACT,
} from '../../helpers/constants';
import { fetchFromApi } from '../../utils/fetchFromApi.jsx';

const sellingConfig = {
  address: SELLING_CONTRACT,
  abi: SELLING_ABI,
};

const ON_SALE = 'On Sale' ;
const STOP_SALE = 'Stop Sale' ;

const ItemForm = ({price, tokenId, saleStatus}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const {
    writeAsync: sellingContract,
    isLoading,
  } = useContractWrite({
    ...sellingConfig,
    functionName: 'setSale',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const price = parseEther(e.target.price.value);
    const saleStatus = e.target.status.value === ON_SALE;

    try {
      const sellingResult = await sellingContract?.({
        args: [
          tokenId,
          price,
          saleStatus,
        ],
      });
      const updateResult = await fetchFromApi({
        endpoint: '/api/admin/item/' + tokenId,
        method: 'POST',
        data: {
          tokenId,
          price: formatEther(price),
          saleStatus
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    const statusValue = e.target.value;
    setStatus(statusValue);
  };

  const disableCheck = () => saleStatus === 2 ;

  useEffect(() => {
    if (saleStatus !== undefined) {
      setStatus(saleStatus === 1 ? ON_SALE : STOP_SALE);
    }
  }, [saleStatus]);

  return (
      <>
        <div className="card no-hover mb-2 p-4">
          <h5 className="text-white mb-3 text-end">Item Details</h5>

          <form onSubmit={ handleSubmit } className="text-end">
            <div className="mb-3">
              <label htmlFor="priceInput"
                     className="form-label text-white">Price</label>
              <div className="input-group">
                <input
                    type="text"
                    defaultValue={ price }
                    className="form-control"
                    id="priceInput"
                    name="price"
                    disabled={ disableCheck() }
                />
                <span className="input-group-text">USDT</span>
              </div>
            </div>

            <fieldset className="mb-3">
              <legend className="text-white mb-2">Status</legend>
              <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="flexRadioDefault1"
                    value={ ON_SALE }
                    checked={ status === ON_SALE }
                    onChange={ handleStatusChange }
                />
                <label className="form-check-label text-white"
                       htmlFor="flexRadioDefault1">
                  { ON_SALE }
                </label>
              </div>
              <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="flexRadioDefault2"
                    value={ STOP_SALE }
                    checked={ status === STOP_SALE  }
                    onChange={ handleStatusChange }
                />
                <label className="form-check-label text-white"
                       htmlFor="flexRadioDefault2">
                  { STOP_SALE }
                </label>
              </div>
            </fieldset>

            <button className="btn btn-primary mt-2" type="submit"
                    disabled={ disableCheck() }>
              {
                loading ? (
                    <div className="spinner-border"
                         role="status"></div>
                ) : 'Change'
              }
            </button>
          </form>
        </div>
      </>

  );
};

export default ItemForm;