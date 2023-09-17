import React from 'react';

import Header from '../components/Header/HeaderAdmin';
import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const Create = () => {
  return (
      <div className="main">
        <Header/>
        <Creates/>
        <Footer/>
        <ModalSearch/>
        <ModalMenu/>
        <Scrollup/>
      </div>
  );
};

export default Create;