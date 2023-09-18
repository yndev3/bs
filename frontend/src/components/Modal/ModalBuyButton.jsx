import React from 'react';
import { useAccount } from 'wagmi';

function ModalBuyButton(props) {

    const { itemData } = props;
    const formattedPrice = itemData && itemData.price ? itemData.price.toLocaleString() : "Price not available";

    const {address, isConnected} = useAccount();


    return (
        <div id="buybutton" className="modal fade p-0">
            <div className="modal-dialog dialog-animated">
                <div className="modal-content h-100">
                    <div className="modal-header" data-dismiss="modal">
                    &nbsp;<i className="far fa-times-circle icon-close" />
                    </div>
                    <div className="modal-body">
                        <form className="row">
                            <div className="col-12 align-self-center">
                                <div className="row">
                                    <div className="col-12 pb-3 white">
                                        <h4 className="search-title mt-0 mb-3">Purchase Confirmation</h4>
                                        <hr className='white'/>
                                        <p>1 item</p>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-3 col-lg-3">
                                        <img src={itemData.image} alt="Item Image" className="square-image" />
                                    </div>
                                    <div className="col-9 col-lg-9 white">
                                        <p>{itemData.name}</p>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-12 pb-3 white">
                                    <hr className='white'/>
                                        <ul className="list-unstyled">
                                            <li className="price d-flex justify-content-between">
                                                <span className="mr-3 text-white">Total price</span>
                                                <span className="word-break">
                                                    <img className="mr-3" src="../img/tether-usdt-logo.png" alt="usdtlogo" width="30px"/>
                                                    { formattedPrice }<span className="h6"> USDT</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="row">
                                {isConnected ? (
                                    <div className="col-12 align-self-center">
                                        <a 
                                            className="d-block btn btn-bordered-white mt-4" 
                                            href="#" 
                                            onClick={props.handleBuy}
                                        >
                                            <i className="icon-handbag mr-2" />Complete purchase
                                        </a>
                                    </div>
                                ) : (
                                    <div className="col-12 align-self-center">
                                        <a 
                                            className="d-block btn btn-bordered-white mt-4" 
                                            href="/wallet-connect" 
                                        >
                                            <i className="icon-wallet mr-md-2" />Wallet Connect
                                        </a>
                                    </div>
                                )}
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
