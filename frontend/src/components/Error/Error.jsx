import React, { Component } from 'react';

const initData = {
    pre_heading: "Error",
    heading: "Oops! Something Went Wrong",
    content1: "We apologize for the inconvenience, but it looks like something broke on our end.You can try refreshing the page, or come back later.",
    content2: "Need immediate assistance? Please contact our support team."
}

class Error extends Component {
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

export default Error;