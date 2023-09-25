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
}

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