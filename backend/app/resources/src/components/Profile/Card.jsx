const NFTCard = ({ item, idx, handleItemSelected }) => {
    const { "name": title, "image": img, created_at: up_date, created_at: exchange_date } = item;

    return (
        <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
            <div className="card min-h">
                <div className="image-over">
                    <a href="/item-details">
                        <img className="card-img-top" src={img} alt="" />
                    </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                    {/* Card Body */}
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
                            <h6 className="mb-0">{up_date}</h6>
                        </div>
                        <div className="seller align-items-center my-3">
                            <span>Exchangeable date and time</span>
                            <h6 className="mb-0">{exchange_date}</h6>
                        </div>

                        <div className="col-12 text-center mt-2">
                            <a 
                                className="btn btn-bordered-white btn-smaller mt-3" 
                                href="#" 
                                data-toggle="modal" 
                                data-target="#reserves"
                                onClick={() => handleItemSelected(item.id, title)} 
                            >
                            <i className="icon-handbag mr-2" />Reserve Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTCard;
