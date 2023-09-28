import React, { useState } from 'react';
import { useContractWrite } from 'wagmi'; // 仮定: wagmi ライブラリがインポートされている
import {
  BRAND_SWAP_ABI,
  BRAND_SWAP_CONTRACT,
} from '../../helpers/constants';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import { waitForTransaction } from '@wagmi/core';

const BrandSwapConfig = {
  address: BRAND_SWAP_CONTRACT,
  abi: BRAND_SWAP_ABI,
};
const BurnForm = ({tokenId}) => {
  const {fetchFromApi} = useFetchFromApi();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {writeAsync} = useContractWrite({
    ...BrandSwapConfig,
    functionName: 'burn',
  });

  const handleBurn = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrorMessage(null); // エラーメッセージをリセット
    setSuccessMessage(null); // 成功メッセージをリセット

    try {
      const burnResult = await writeAsync?.({
        args: [tokenId],
      });
      const receipt = await waitForTransaction(burnResult);
      if (receipt.status === 'success') {
        await fetchFromApi({
          endpoint: '/api/admin/item/' + tokenId + '/burn',
          method: 'POST',
          data: {tokenId, is_burn: true},
        });
        setSuccessMessage('Burn and database update successful.');
      } else {
        setErrorMessage('Blockchain transaction failed.');
      }

    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

        { errorMessage &&
            <div className="text-danger text-center">{ errorMessage }</div> }
        { successMessage &&
            <div className="text-success text-center">{ successMessage }</div> }
      </div>
  );
};

export default BurnForm;
