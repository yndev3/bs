import React from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ExploreWatches from '../components/Explore/ExploreWatches';
import ExploreJewelrys from '../components/Explore/ExploreJewelrys';
import ExploreMaterials from '../components/Explore/ExploreMaterials';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const ThemeOne = () => {
  return (
      <div className="main">
        <Header/>
        <Hero/>
        <Work/>
        <ExploreWatches heading='Watches'/>
        <ExploreJewelrys/>
        <ExploreMaterials/>
        <Footer/>
        <ModalMenu/>
        <Scrollup/>
      </div>
  );
};

export default ThemeOne;