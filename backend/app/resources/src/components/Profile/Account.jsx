import React, { Component } from 'react';



class Account extends Component {
    render() {
        const { initData, data } = this.props;
        
        return (
            <section className="explore-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro mb-4">
                                <div className="intro-content">
                                    <span>NFT Assets</span>
                                    <h3 className="mt-3 mb-0 silver-color">{initData.heading}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row items explore-items">
                        {data.map((item, idx) => {
                            return (
                                <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
                                    <div className="card min-h">
                                        <div className="image-over">
                                            <a href="/item-details">
                                                <img className="card-img-top" src={item.img} alt="" />
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
                                                        <h5 className="mb-0">{item.title}</h5>
                                                    </a>
                                                </div>
                                                <div className="seller align-items-center my-3">
                                                    <span>Last Update</span>
                                                    <h6 className="mb-0">{item.up_date}</h6>
                                                </div>
                                                <div className="seller align-items-center my-3">
                                                    <span>Exchangeable date and time</span>
                                                    <h6 className="mb-0">{item.ex_date}</h6>
                                                </div>

                                                <div className="col-12 text-center mt-2">
                                                    <a className="btn btn-bordered-white btn-smaller mt-3" href="#" data-toggle="modal" data-target="#reserves"><i className="icon-handbag mr-2" />Reserve Now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Account;