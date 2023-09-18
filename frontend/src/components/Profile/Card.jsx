const NFTCard = ({ item, idx, handleItemSelected }) => {
    const { "name": title, "image": img, transfer_at: up_date, } = item;

    const formattedUpDate = (() => {
        const dateObject = new Date(up_date);
        return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
    })();

    const futureDate = (() => {
        const dateObject = new Date(up_date);
        dateObject.setDate(dateObject.getDate() + 90);
        return dateObject;
    })();

    const currentDate = new Date();

    const timeDiff = futureDate - currentDate;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    const isExchangeable = timeDiff <= 0;
    const isButtonDisabled = timeDiff > 0;

    return (
        <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
            <div className="card min-h">
                <div className="image-over">
                    <a href={`/item-details/${item.token_id}`}>
                        <img className="card-img-top" src={img} alt="" />
                    </a>
                </div>
                <div className="card-caption col-12 p-0">
                    <div className="card-body">
                        <div className="card-bottom d-flex justify-content-between">
                            <span>ID</span>
                            <span>{item.id}</span>
                        </div>
                        <div className="seller align-items-center my-3">
                            <a href="/item-details">
                                <h5 className="mb-0">{title}</h5>
                            </a>
                        </div>
                        <div className="seller align-items-center my-3">
                            <span>Last Update</span>
                            <h6 className="mb-0">{formattedUpDate}</h6> 
                        </div>
                        <div className="seller align-items-center my-3">
                            <span>Exchangeable date and time</span>
                            <h6 className="mb-0">{isExchangeable ? "Exchangeable now" : `${days}d ${hours}h ${minutes}m ${seconds}s remaining`}</h6> 
                        </div>
                        <div className="col-12 text-center mt-2">
                        <a 
                                className={`btn btn-smaller mt-3 ${isExchangeable ? 'btn-bordered-white' : 'btn-disabled'}`} 
                                href="#" 
                                data-toggle={isButtonDisabled ? null : "modal"} 
                                data-target={isButtonDisabled ? null : "#reserves"}
                                onClick={(e) => {
                                    if (isButtonDisabled) {
                                        e.preventDefault();
                                    } else {
                                        handleItemSelected(item.id, title);
                                    }
                                }}
                            >
                            <i className={`icon-${isExchangeable ? 'handbag' : 'ban'} mr-2`}></i>{isExchangeable ? "Reserve Now" : "Holding Period"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTCard;
