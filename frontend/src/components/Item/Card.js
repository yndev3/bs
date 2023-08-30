import React from 'react';

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
          <div className="card">
            <div className="image-over">
              <a href={ `/item-details/${ item.id }` }>
                <img className="card-img-top"
                     src={ convertIpfsLink(item.image) } alt=""/>
              </a>
            </div>
            {/* Card Caption */ }
            <div className="card-caption col-12 p-0">
              {/* Card Body */ }
              <div className="card-body">
                <h5 className="mb-0">{ item.name }</h5>
                <div className="seller align-items-center my-3">
                  <span>Brand by</span>
                  <h6 className="mb-0">{ item.brand }</h6>
                </div>
                <div className="card-bottom text-right">
                  <span className="">{ item.price } USDT</span>
                </div>
                <div className="col-12 text-center mt-2">
                  <a className="btn btn-bordered-white btn-smaller mt-3"
                     href={ `/item-details/${ item.id }` }>
                    <i className="icon-handbag mr-2"/>Show
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};
export default Card;