import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/Explore';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const initData = {
    heading: "Materials",
    content: "Unlock the world of NFT materials, featuring digital representations of precious metals and materials. Explore a range of gold bars, platinum coins, and other valuable elements that add a touch of authenticity to your digital assets.",
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

class ExploreTwo extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="Explore" subpage="Explore" page="Explore Style 3" />
                <Explore initData={initData} category="Material" />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreTwo;