import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Account from '../components/Profile/Account';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

const initData = {
    heading: "My Item Collection",
}

const data = [
    {
        id: "1",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMAN",
        up_date: "August 21, 2023 20:08:51 ",
        ex_date: "August 21, 2023 20:08:51 ",
    },
    {
        id: "1",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMAN",
        up_date: "August 21, 2023 20:08:51 ",
        ex_date: "August 21, 2023 20:08:51 ",
    },
    {
        id: "1",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL N",
        up_date: "August 21, 2023 20:08:51 ",
        ex_date: "August 21, 2023 20:08:51 ",
    },
    {
        id: "1",
        img: "/img/Watches.jpg",
        title: "DAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMANDAYTONA PAUL NEWMAN",
        up_date: "August 21, 2023 20:08:51 ",
        ex_date: "August 21, 2023 20:08:51 ",
    },
    
]


class ExploreOne extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Breadcrumb title="My Account" subpage="My Account" page="My Account" />
                <Account initData={initData} data={data} />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default ExploreOne;