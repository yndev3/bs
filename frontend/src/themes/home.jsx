import React from 'react';

import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ExploreHome from '../components/Explore/ExploreHome';
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
        <ExploreHome heading='Watches' category="Watch" linkTo="/explore-watches"/>
        <ExploreHome heading='Jewelries' category="Jewelry" linkTo="/explore-jewelries"/>
        <ExploreHome heading='Material' category="Material" linkTo="/explore-materials"/>
        <Footer/>
        <ModalMenu/>
        <Scrollup/>
      </div>
  );
};

export default ThemeOne;