import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { waitForTransaction } from '@wagmi/core';
import {
  useAccount,
  useContractReads,
  useBalance,
  useContractWrite,
  useWaitForTransaction,
  erc20ABI,
} from 'wagmi';
import {
  SELLING_ABI,
  // ERC20_ABI,
  SELLING_CONTRACT,
  ERC_20_TOKEN_CONTRACT,
} from '../../helpers/constants';
import { formatEther } from 'viem';
import { fetchFromApi } from '../../utils/fetchFromApi';

const sellingConfig = {
  address: SELLING_CONTRACT,
  abi: SELLING_ABI,
};

const erc20Config = {
  address: ERC_20_TOKEN_CONTRACT,
  abi: erc20ABI,
};

function ModalBuyButton({id: tokenId, itemData}) {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState(null);
  const {address, isConnected} = useAccount();
  const {data: readData} = useContractReads({
    contracts,
    onSuccess: (data) => {
      // console.log('data', data);
    },
  });
  const {data: fetchBalanceResult} = useBalance({
    address: address,
    token: ERC_20_TOKEN_CONTRACT,
  });

  const {
    writeAsync: erc20Contract,
    isLoading,
  } = useContractWrite({
    ...erc20Config,
    functionName: 'approve',
  });

  const {
    writeAsync: sellingContract,
  } = useContractWrite({
    ...sellingConfig,
    functionName: 'buyWithERC20',
  });

  const formattedPrice = itemData && itemData.price
      ? itemData.price.toLocaleString()
      : 'Price not available';

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selling = readData[0].result;
      if (!selling.isSale) {
        alert('The token is not for sale');
        return;
      }

      const balance = Number(formatEther(readData[1].result));
      const price = Number(formatEther(selling.price));
      if (balance < price){
        alert('Insufficient balance for the purchase');
        return;
      }

      const allowance = Number(formatEther(readData[2].result));
      console.log('balance', balance);
      console.log('allowance', allowance);
      console.log('price', price);
      if (allowance < price) {
        const erc20Result = await erc20Contract?.({
          args: [SELLING_CONTRACT, selling.price],
        });
        const receipt = await waitForTransaction(erc20Result);
      }

      const sellingResult = await sellingContract?.({
        args: [
          tokenId,
          selling.price,
          ERC_20_TOKEN_CONTRACT,
        ],
      });
      // DBに購入履歴を記録する
      await fetchFromApi({
        endpoint: '/api/purchase',
        method: 'POST',
        data: {
          tokenId: tokenId,
          buyer: address,
          price: formatEther(selling.price),
          hash: sellingResult.hash,
        },
      });
    } catch (Error) {
      // todo エラーログを記録する為にバックエンドに送信する

    } finally {
      setLoading(false);
    }
  };

  const removeModalBackdrop = () => {
    const backdrop = document.querySelector('.modal-backdrop.fade.show');
    if (backdrop) {
      backdrop.classList.remove('show');
    }
  };

  useEffect(() => {
    if (address) {
      setContracts([
        {
          ...sellingConfig,
          functionName: 'getSale',
          args: [tokenId],
        },
        {
          ...erc20Config,
          functionName: 'balanceOf',
          args: [address],
        },
        {
          ...erc20Config,
          functionName: 'allowance',
          args: [address, SELLING_CONTRACT],
        },
      ]);
    }
  }, [address]);

  return (
      <div id="buybutton" className="modal fade p-0">
        <div className="modal-dialog dialog-animated">
          <div className="modal-content h-100">
            <div className="modal-header" data-dismiss="modal">
              &nbsp;<i className="far fa-times-circle icon-close"/>
            </div>
            <div className="modal-body">
              <form className="row">
                <div className="col-12 align-self-center">
                  <div className="row">
                    <div className="col-12 pb-3 white">
                      <h4 className="search-title mt-0 mb-3">Purchase
                        Confirmation</h4>
                      <hr className="white"/>
                      <p>1 item</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-3 col-lg-3">
                      <img src={ itemData.image } alt="Item Image"
                           className="square-image"/>
                    </div>
                    <div className="col-9 col-lg-9 white">
                      <p>{ itemData.name }</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 pb-3 white">
                      <hr className="white"/>
                      <ul className="list-unstyled">
                        <li className="price d-flex justify-content-between">
                          <span className="mr-3 text-white">Total price</span>
                          <span className="word-break">
                                                    <img className="mr-3"
                                                         src="../img/tether-usdt-logo.png"
                                                         alt="usdtlogo"
                                                         width="30px"/>
                            { formattedPrice }<span className="h6"> USDT</span>
                                                </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    { isConnected ? (
                        <div className="col-12 align-self-center">
                          <button
                              className="d-block btn btn-bordered-white mt-4"
                              onClick={ handleBuy }
                              disabled={ loading }
                          >
                            { loading ? (
                                <><i
                                    className="fas fa-spinner fa-spin mr-2"/> Loading...</>
                            ) : (
                                <><i className="icon-handbag mr-2"/> Complete
                                  purchase</>
                            ) }
                          </button>
                        </div>
                    ) : (
                        <div className="col-12 align-self-center">
                          <Link
                              className="d-block btn btn-bordered-white mt-4"
                              to="/wallet-connect"
                              onClick={ removeModalBackdrop }
                          >
                            <i className="icon-wallet mr-md-2"/> Wallet Connect
                          </Link>
                        </div>
                    ) }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ModalBuyButton;
