import React, { Component } from 'react';

const initData = {
    title: "Walking On AirWalking On AirWalking On Air",
    itemImg: "/img/auction_2.jpg",
    price: "1,000",
    ownerImg: "/img/avatar_1.jpg",
    itemOwner: "Themeland",
    created: "15 Jul 2021",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    price_1: "1.5 ETH",
    price_2: "$500.89",
    count: "1 of 5",
    size: "14000 x 14000 px",
    volume: "64.1",

}

const sellerData = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        seller: "@ArtNoxStudio",
        post: "Creator"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        seller: "Virtual Worlds",
        post: "Collection"
    }
]

class ItemDetails extends Component {
    state = {
        initData: {},
        sellerData: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            sellerData: sellerData
        })
    }
    render() {
        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <h3 className="mt-0">{this.state.initData.title}</h3>
                                <div className="item-thumb text-center">
                                    <img src={this.state.initData.itemImg} alt="" />
                                </div>
                            </div>
                            <div className="col-12 item px-lg-2 mt-3">
                                <div className="card no-hover">
                                    <div className="price d-flex justify-content-between align-items-center">
                                        <span>Price</span>
                                        <span>1 of 1</span>
                                    </div>
                                    <h4 className="mt-0 mb-2">{this.state.initData.price}<span className='h6'> USDT</span></h4>
                                </div>
                            </div>
                            <a className="d-block btn btn-bordered-white mt-4" href="/wallet-connect">Place a Buy</a>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <p>
                                    <span className='text-white'>Description</span><br/>
                                    {this.state.initData.content}
                                </p>
                                {/* Owner */}
                                <div className="owner d-flex align-items-center">
                                    <span>Owned By</span>
                                    <a className="owner-meta d-flex align-items-center ml-3" href="/author">
                                        <img className="avatar-sm rounded-circle" src={this.state.initData.ownerImg} alt="" />
                                        <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                    </a>
                                </div>
                                {/* Item Info List */}
                                <div className="item-info-list mt-4">
                                    <ul className="list-unstyled">
                                        <li className="price d-flex justify-content-between">
                                            <span>Current Price {this.state.initData.price_1}</span>
                                            <span>{this.state.initData.price_2}</span>
                                            <span>{this.state.initData.count}</span>
                                        </li>
                                        <li>
                                            <span>Size </span>
                                            <span>{this.state.initData.size}</span>
                                        </li>
                                        <li>
                                            <span>Volume Traded </span>
                                            <span>{this.state.initData.volume}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="row items">
                                    {this.state.sellerData.map((item, idx) => {
                                        return (
                                            <div key={`sd_${idx}`} className="col-12 col-md-6 item px-lg-2">
                                                <div className="card no-hover">
                                                    <div className="single-seller d-flex align-items-center">
                                                        <a href="/author">
                                                            <img className="avatar-md rounded-circle" src={item.img} alt="" />
                                                        </a>
                                                        {/* Seller Info */}
                                                        <div className="seller-info ml-3">
                                                            <a className="seller mb-2" href="/author">{item.seller}</a>
                                                            <span>{item.post}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ItemDetails;