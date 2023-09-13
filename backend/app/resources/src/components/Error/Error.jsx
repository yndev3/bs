import React, { Component } from 'react';

const initData = {
    pre_heading: "Error",
    heading: "Error理由",
    content: "説明文"
}

const socialData = [
    {
        id: "1",
        link: "facebook",
        icon: "fab fa-facebook-f"
    },
    {
        id: "2",
        link: "twitter",
        icon: "fab fa-twitter"
    },
    {
        id: "3",
        link: "google-plus",
        icon: "fab fa-google-plus-g"
    }
]

class Error extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: socialData
        })
    }
    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Error;