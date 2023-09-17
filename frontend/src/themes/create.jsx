import React from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/AdminBreadcrumb';
import Creates from '../components/Create/Create';
import Footer from '../components/Footer/Footer';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const Create = () => {
  return (
      <div className="main">
        <Header/>
        <Breadcrumb title="Control panel"/>
        <Creates/>
        <Footer/>
        <ModalMenu/>
        <Scrollup/>
      </div>
  );
};

export default Create;