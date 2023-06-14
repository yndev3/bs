import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ExploreWatches from '../components/Explore/ExploreWatches';
import ExploreJewelrys from '../components/Explore/ExploreJewelrys';
import ExploreMaterials from '../components/Explore/ExploreMaterials';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class ThemeOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Hero />
                <Work />
                <ExploreWatches />
                <ExploreJewelrys />
                <ExploreMaterials />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ThemeOne;