import React, { Component } from 'react';

class Work extends Component {
    state = {
        data: {
            preHeading: "How It Works",
            heading: "Create and sell your NFTs",
        },
        workData: [
            {
                id: 1,
                icon: "icons icon-wallet text-effect",
                title: "Connect Your Wallet",
                text: "Connect your preferred wallet with ease. No complex registrations required.Once you’ve set up your wallet of choice, simply connect it to BrandSwap."
            },
            {
                id: 2,
                icon: "icons icon-grid text-effect",
                title: "Explore Collections",
                text: "Discover NFTs backed by real-world assets across a wide range of offerings.Browse through our diverse lineup of NFTs, each supported by tangible assets."
            },
            {
                id: 3,
                icon: "icons icon-bag text-effect",
                title: "Make a Purchase",
                text: "Buy NFTs effortlessly by connecting your wallet and completing a swift transaction.Acquiring NFTs is a breeze. Simply link your wallet and finalize your transaction."
            },
            {
                id: 4,
                icon: "icons icon-drawer text-effect",
                title: "Swap with Real Assets",
                text: "Swap your NFTs for real assets at affiliated stores across the globe once a predetermined time has passed.It's up to you whether you want to exchange or not."
            }
        ]
    }

    render() {
        const { data, workData } = this.state;

        return (
            <section className="work-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro mb-4">
                                <div className="intro-content">
                                    <span>{data.preHeading}</span>
                                    <h3 className="mt-3 mb-0 silver-color">{data.heading}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {workData.map((item, idx) => {
                            return (
                                <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                    {/* Single Work */}
                                    <div className="single-work">
                                        <i className={item.icon} />
                                        <h4>{item.title}</h4>
                                        <p>{item.text}</p>
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

export default Work;
