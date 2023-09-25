import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/Explore';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const initData = {
    heading: "Jewelrys",
    content: "Discover the brilliance of NFT jewelry, where virtual elegance meets timeless beauty. Browse our collection of digital jewelry pieces, capturing the essence of luxurious adornments in the digital realm.",
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

const data = [
    {
        id: "1",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMAN",
        brand: "ROREXROREXROREXROREXROREXROREX",
        price: "1,000",
        group: '["art","ROREX"]',
    },
    {
        id: "2",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    },
    {
        id: "3",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    },
    {
        id: "4",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    },
    {
        id: "5",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    },
    {
        id: "6",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    },
    {
        id: "7",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    },
    {
        id: "8",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMAN",
        brand: "ROREX",
        price: "1,000",
        group: '["art","sports"]',
    }
    
]


class ExploreTwo extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="ExploreJewelrys" subpage="Jewelrys" page="Jewelrys" />
                <Explore initData={initData} category="Jewelry" />
                <Footer />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreTwo;