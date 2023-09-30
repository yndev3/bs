import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { waitForTransaction } from '@wagmi/core';
import {
  useAccount,
  useContractReads,
  useContractWrite,
  erc20ABI,
} from 'wagmi';
import {
  SELLING_ABI,
  SELLING_CONTRACT,
  ERC_20_TOKEN_CONTRACT,
} from '../../helpers/constants';
import { formatEther, TransactionExecutionError } from 'viem';
import { useFetchFromApi } from '../../hooks/fetchFromApi';
import { logErrorToBackend } from '../../utils/logErrorToBackend';

const sellingConfig = {
  address: SELLING_CONTRACT,
  abi: SELLING_ABI,
};

const erc20Config = {
  address: ERC_20_TOKEN_CONTRACT,
  abi: erc20ABI,
};

function ModalBuyButton({id: tokenId, itemData}) {
  const { fetchFromApi, error:apiError, loading:isApiLoading} = useFetchFromApi();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Purchase');
  const [contracts, setContracts] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const {address, isConnected} = useAccount();
  const {data: readData} = useContractReads({
    contracts,
  });

  const {
    writeAsync: erc20Contract,
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

  const handleApproval = async (selling) => {
    setStatus('waiting for approval...');
    const erc20Result = await erc20Contract?.({
      args: [SELLING_CONTRACT, selling.price],
    });
    return await waitForTransaction(erc20Result);
  };

  const handleTransfer = async (selling, tokenId) => {
    const sellingResult = await sellingContract?.({
      args: [
        tokenId,
        selling.price,
        ERC_20_TOKEN_CONTRACT,
      ],
    });
    setStatus('waiting for Transaction...');
    return await waitForTransaction(sellingResult);
  };

  const handleSavePurchase = async (price, transferReceipt) => {
    return await fetchFromApi({
      endpoint: '/api/purchase',
      method: 'POST',
      data: {
        tokenId: Number(tokenId),
        buyer: address,
        price: price,
        hash: transferReceipt.transactionHash,  // Note: Changed from 'sellingResult.hash'
      },
    });
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Loading...');
    try {
      const selling = readData[0].result;
      if (!selling.isSale) {
        alert('The token is not for sale');
        return;
      }

      const balance = Number(formatEther(readData[1].result));
      const price = Number(formatEther(selling.price));

      if (balance < price) {
        alert('Insufficient balance for the purchase');
        return;
      }
      setStatus('check allowance...');
      const allowance = Number(formatEther(readData[2].result));
      if (allowance < price) {
        const approvalReceipt = await handleApproval(selling);
        if (approvalReceipt.status !== 'success') {
          throw new Error('Approval failed');
        }
      }

      const transferReceipt = await handleTransfer(selling, tokenId);
      console.log(transferReceipt);
      if (transferReceipt.status !== 'success') {
        const error = new new Error('Transfer failed');
        error.additionalData = transferReceipt;
        throw error;
      }

      const purchaseReceipt = await handleSavePurchase(price, transferReceipt); // assuming it's async
      if (purchaseReceipt.status !== 'success') {
        throw new Error('Save purchase failed');
      }

      setStatus('Complete!');
    } catch (error){
      setErrorMessage(error.message);
      setStatus('error');
    } finally {
      console.log('finally');
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

  useEffect(() => {
    if (errorMessage) {
      (async () => {
        await logErrorToBackend(errorMessage);
      })();
    }
  }, [errorMessage]);

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
                            {Number(itemData.price).toLocaleString()}<span className="h6"> USDT</span>
                                                </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 align-self-center">
                      {isConnected ? (
                          <button
                              className="d-block btn btn-bordered-white mt-4 w-100"
                              onClick={ handleBuy }
                              disabled={ loading }
                          >
                            { loading && status !== 'Complete!' ? (
                                <><i
                                    className="fas fa-spinner fa-spin mr-2"/>{ status }</>
                            ) : (
                                <><i className="icon-handbag mr-2"/>Confirm</>
                            ) }
                          </button>
                      ) : (
                          <Link
                              className="d-block btn btn-bordered-white mt-4"
                              to="/wallet-connect"
                              onClick={ removeModalBackdrop }
                          >
                            <i className="icon-wallet mr-md-2"/> Wallet Connect
                          </Link>
                      )}
                      { status === 'Complete!' && <div className="alert alert-success mt-3 text-center">Complete!</div> }
                      { errorMessage && <div className="alert alert-danger mt-3 text-center">Something Error
                        Occurred.Please try again.</div> }
                    </div>

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
