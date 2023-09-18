import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {
    render() {
        return (
            <section className="breadcrumb-area overlay-dark d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                            {/* Breamcrumb Content */}
                            <div className="breadcrumb-content text-center">
                                <h2 className="m-0">{this.props.title}</h2>
                                <ol className="breadcrumb d-flex justify-content-center">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="#">{this.props.page}</Link></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Breadcrumb;