import React from 'react';

import Header from '../components/Header/Header';
import StoreList from '../components/Store/StoreList';
import Footer from '../components/Footer/Footer';
import Scrollup from '../components/Scrollup/Scrollup';

const StoresList = () => {
  return (
      <div className="main">
        <Header/>
        <StoreList/>
        <Footer/>
        <Scrollup/>
      </div>
  );
};

export default StoresList;