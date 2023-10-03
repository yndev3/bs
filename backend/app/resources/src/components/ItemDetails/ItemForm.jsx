import React, { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import {
  SELLING_ABI,
  SELLING_CONTRACT,
} from '../../helpers/constants';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import { waitForTransaction } from '@wagmi/core';
import { logErrorToBackend } from '../../utils/logErrorToBackend.jsx';

const sellingConfig = {
  address: SELLING_CONTRACT,
  abi: SELLING_ABI,
};

const ON_SALE = 'On Sale' ;
const STOP_SALE = 'Stop Sale' ;

const ItemForm = ({price, tokenId, saleStatus}) => {
  const {fetchFromApi} = useFetchFromApi();
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [exception, setException] = useState(null);
  const [status, setStatus] = useState('');
  const {
    writeAsync: sellingContract,
    isLoading,
  } = useContractWrite({
    ...sellingConfig,
    functionName: 'setSale',
  });

  const sendDataToBackend = async (receipt, price, tokenId, saleStatus) => {
    try {
       await fetchFromApi({
        endpoint: '/api/admin/item/' + tokenId + '/sales',
        method: 'POST',
        data: {
          tokenId,
          price: formatEther(price),
          saleStatus
        },
      });
      setIsComplete(true);
    } catch {
      const error = new Error('Failed to send to backend.');
      error.additionalData = {
        level: 'error',
        additional_info: receipt,
      };
      setException(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsComplete(false)
    setLoading(true);
    const inputPrice = parseEther(e.target.price.value);
    const saleStatus = e.target.status.value === ON_SALE;
    try {
      const sellingResult = await sellingContract?.({
        args: [
          tokenId,
          inputPrice,
          saleStatus,
        ],
      });

      const tx = await waitForTransaction(sellingResult);

      if (tx.status === 'success') {
        await sendDataToBackend(tx, inputPrice, tokenId, saleStatus);
      } else {
        throw new Error('Set sale Transaction failed');
      }
    } catch (error) {
      setException(error);
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

  useEffect(() => {
    if (exception) {
      (async () => {
        await logErrorToBackend(exception);
      })();
    }
  }, [exception]);

  useEffect(() => {
    if(exception || isComplete) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [exception, isComplete]);

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

            <button className="btn btn-primary mt-2 btn-block" type="submit"
                    disabled={ disableCheck() }>
              {
                loading ? (
                    <div className="spinner-border"
                         role="status"></div>
                ) : 'Change'
              }
            </button>
          </form>
          { isComplete && <div className="alert alert-success mt-3 text-center">Completed!</div> }
          { exception && <div className="alert alert-danger mt-3 text-center">Something Error
            Occurred.Please try again.</div> }
        </div>
      </>

  );
};

export default ItemForm;