import React, { Component } from 'react';

const initData = {
    pre_heading: "ERROR",
    heading: "404: Page Not Found",
    content1: "Oops!We're sorry, but the page you were looking for doesn't exist.",
    content2: "You may have mistyped the address or the page may have moved."
}

class E404 extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section className="author-area">
                <div className="container mt-2">
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center mt-5">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-5 mb-5">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content1}</p>
                                <p>{this.state.initData.content2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default E404;