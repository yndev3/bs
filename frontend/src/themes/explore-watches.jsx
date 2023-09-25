import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/Explore';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const initData = {
    heading: "Watches",
    content: "Explore a curated selection of exquisite NFT watches, each a digital representation of finely crafted timepieces. Own these unique digital collectibles while embracing the legacy of horology's finest creations.",
    btn_2: "Load More",
    filter: [
        "All",
        "ROREX",
        "PATEK PHILIPPE",
        "AUDEMARS PIGUET",
        "Richard Mille",
        "Harry Winston",
        "Cartier",
        "CHANEL",
        "OMEGA",
         "HERMES",
         "BVLGARI",
         "GUCCI",
         "CHOPARD",
         "HUBLOT",
         "BREITLING",
         "LOUIS VUITTON",
         "Van Cleef & Arpels",
         "LOUIS VUITTON",
         "FENDI",
         "CHAUMET",
         "Tiffany&Co",
         "PANERAI"
    ]
}


class ExploreOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="ExploreWatches" subpage="Watches" page="Watches" />
                <Explore initData={initData} category="Watch" />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreOne;