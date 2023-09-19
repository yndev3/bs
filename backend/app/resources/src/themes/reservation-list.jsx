import React from 'react';

import Header from '../components/Header/Header';
import ReservationList from '../components/Admin/ReservationList';
import Footer from '../components/Footer/Footer';
import Scrollup from '../components/Scrollup/Scrollup';

const Create = () => {
  return (
      <div className="main">
        <Header/>
        <ReservationList/>
        <Footer/>
        <Scrollup/>
      </div>
  );
};

export default Create;