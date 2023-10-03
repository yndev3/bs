import React, { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi'; // 仮定: wagmi ライブラリがインポートされている
import {
  BRAND_SWAP_ABI,
  BRAND_SWAP_CONTRACT,
} from '../../helpers/constants';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import { waitForTransaction } from '@wagmi/core';
import { formatEther } from 'viem';
import { logErrorToBackend } from '../../utils/logErrorToBackend.jsx';

const BrandSwapConfig = {
  address: BRAND_SWAP_CONTRACT,
  abi: BRAND_SWAP_ABI,
};
const BurnForm = ({tokenId}) => {
  const {fetchFromApi} = useFetchFromApi();
  const [exception, setException] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {writeAsync} = useContractWrite({
    ...BrandSwapConfig,
    functionName: 'burn',
  });

  const sendDataToBackend = async (receipt) => {
    try {
      await fetchFromApi({
        endpoint: '/api/admin/item/' + tokenId + '/burn',
        method: 'POST',
        data: {tokenId, is_burn: true},
      });
      setSuccessMessage('Burn and database update successful.');
    } catch {
      const error = new Error('Failed to send to backend.');
      error.additionalData = {
        level: 'error',
        additional_info: receipt,
      };
      setException(error);
    }
  };

  const handleBurn = async (e) => {
    e.preventDefault();
    setLoading(true)
    setException(null); // エラーメッセージをリセット
    setSuccessMessage(null); // 成功メッセージをリセット

    try {
      const burnResult = await writeAsync?.({
        args: [tokenId],
      });
      const receipt = await waitForTransaction(burnResult);
      if (receipt.status === 'success') {
        await sendDataToBackend(receipt);
      } else {
        setException('Blockchain transaction failed.');
      }
    } catch (error) {
      setException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (exception) {
      (async () => {
        await logErrorToBackend(exception);
      })();
    }
  }, [exception]);

  useEffect(() => {
    if(exception || successMessage) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [exception, successMessage]);

  return (
      <div className="card no-hover mb-2">
        <p>
          <span className="text-white h5">Burn</span>
        </p>
        <button className="btn btn-primary btn-block" onClick={ handleBurn }>
          { isLoading
              ? (<div className="spinner-border" role="status"></div>)
              : 'Burn'
          }
        </button>

        { exception &&
            <div className="text-danger text-center">Something went wrong. Please try again.</div> }
        { successMessage &&
            <div className="text-success text-center">{ successMessage }</div> }
      </div>
  );
};

export default BurnForm;
