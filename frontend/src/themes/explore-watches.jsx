import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Explore from '../components/Explore/Explore';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const initData = {
    heading: "Watches",
    content: "Explore a curated selection of exquisite NFT watches, each a digital representation of finely crafted timepieces. Own these unique digital collectibles while embracing the legacy of horology's finest creations.",
    btn_2: "Load More",
}


class ExploreOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />

                <Explore initData={initData} category="Watch" />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreOne;