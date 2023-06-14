import React, { Component } from 'react';

const initData = {
    pre_heading: "Luxury Goods Marketplace",
    heading: "BRAND SWAP",
    content: "The NFT marketplace utilizing tangible assets such as watches, luxury goods, and gold as collateral.",
    btn_1: "Explore",
    btn_2: "Create"
}

class Hero extends Component {
    state = {
        data: {}
    }
    componentDidMount(){
        this.setState({
            data: initData
        })
    }
    render() {
        return (
            <section className="hero-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-7">
                            <span>{this.state.data.pre_heading}</span>
                            <h1 className="mt-4">{this.state.data.heading}</h1>
                            <p>{this.state.data.content}</p>
                            {/* Buttons */}
                            <div className="button-group">
                                <a className="btn btn-bordered-white" href="/explore-1"><i className="icon-rocket mr-2" />{this.state.data.btn_1}</a>
                                <a className="btn btn-bordered-white" href="/create"><i className="icon-note mr-2" />{this.state.data.btn_2}</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Shape */}
                <div className="shape">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 465" version="1.1">

                    
                    </svg>
                </div>
            </section>
        );
    }
}

export default Hero;