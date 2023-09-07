import React, { Component } from 'react';

const initData = {
    pre_heading: "Materials Assets NFTs",
    heading: "Materials",
    btn_1: "View All",
    btn_2: "Load More"
}

const data = [
    {
        id: "1",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "2",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "3",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "4",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "5",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "6",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "7",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    },
    {
        id: "8",
        img: "/img/Materials.jpg",
        title: "1kg gold ingot",
        brand: "MITSUBISHI MATERIALS",
        price: "1,000",
    }
]

class ExploreMaterials extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: data
        })
    }
    render() {
        return (
            <section className="explore-area load-more p-0 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>{this.state.initData.pre_heading}</span>
                                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/explore-3">{this.state.initData.btn_1}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`exo_${idx}`} className="mt-3 col-12 col-sm-6 col-lg-3 itemmaterial">
                                    <div className="card">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="card-img-top" src={item.img} alt="" />
                                            </a>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <a href="/item-details">
                                                    <h5 className="mb-0">{item.title}</h5>
                                                </a>
                                                <div className="seller align-items-center my-3">
                                                    <span>Brand by</span>
                                                    <a href="/author">
                                                        <h6 className="mb-0">{item.brand}</h6>
                                                    </a>
                                                </div>
                                                <div className="card-bottom d-flex justify-content-between">
                                                    <span>{item.price} USDT</span>
                                                    <span>1 of 1</span>
                                                </div>
                                                <div className="col-12 text-center mt-2">
                                                    <a className="btn btn-bordered-white btn-smaller mt-3" href="/login"><i className="icon-handbag mr-2" />Place a Buy</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <a id="load-btn-material" className="btn btn-bordered-white mt-5" href="#">{this.state.initData.btn_2}</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ExploreMaterials;