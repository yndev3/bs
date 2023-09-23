import React from 'react';
import { Link } from 'react-router-dom';

const Card = (props) => {
  const item = props.item;

  function convertIpfsLink(ipfsLink) {
    const baseUrl = 'https://w3s.link/ipfs/';
    if (ipfsLink.startsWith('ipfs://')) {
      return ipfsLink.replace(/^ipfs:\/\//, baseUrl);
    } else {
      return ipfsLink;
    }
  }

  return (
      <>
        <div className="mt-3 col-12 col-sm-6 col-lg-3">
          <div className="card card-min">
            <div className="image-over">
              <Link to={ `/item-details/${ item.id }` }>
                <img className="card-img-top"
                     src={ convertIpfsLink(item.image) } alt=""/>
              </Link>
            </div>
            {/* Card Caption */ }
            <div className="card-caption col-12 p-0">
              {/* Card Body */ }
              <div className="card-body">
                <h5 className="mb-0">{ item.name }</h5>
                <div className="seller align-items-center my-3 mb-3">
                  <span>Brand by</span>
                  <h6 className="mb-0 ellipsis">{ item.brand }</h6>
                </div>
                <div className="card-bottom d-flex justify-content-between">
                    <span>1 of 1</span>
                    <span>
                      <img className="mr-2" src="../img/tether-usdt-logo.png" alt="usdtlogo" width="21px"/>
                      <span className="card-price">{Number(item.price).toLocaleString()}</span> USDT</span>
                </div>
                <div className="col-12 text-center mt-3">

                  <Link className="btn btn-bordered-white btn-smaller mt-3"
                     to={ `/item-details/${ item.id }` }>
                      <i className="icon-handbag mr-2" aria-hidden="true"></i>
                     ItemDetail
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};
export default Card;