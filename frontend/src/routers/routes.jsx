import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importing all the themes
import Home from '../themes/home';
import ScrollToTop from '../components/Scrollup/ScrollTop';
import ExploreWatches from '../themes/explore-watches';
import Explorejewelries from '../themes/explore-jewelries';
import ExploreMaterials from '../themes/explore-materials';
import ItemDetails from '../themes/item-details';
import Activity from '../themes/activity';
import WalletConnect from '../themes/wallet-connect';
import Contact from '../themes/contact';
import Account from '../themes/account';
import Rreservation from '../themes/reservation';
import StoreList from '../themes/store-list';
import Error from '../themes/error';
import Error404 from '../themes/404';

import PrivateRoute from '../components/Login/Redirect';


const MyRouts = () => {
  return (
      <>
      <Router>
          <ScrollToTop />
          <Switch>
              <Route exact path="/" component={ Home }/>
              <Route exact path="/explore-watches" component={ ExploreWatches }/>
              <Route exact path="/explore-jewelries" component={ Explorejewelries }/>
              <Route exact path="/explore-materials" component={ ExploreMaterials }/>
              <Route path="/item-details/:id" component={ ItemDetails }/>
              <Route exact path="/wallet-connect" component={ WalletConnect }/>
              <Route exact path="/store-list" component={ StoreList }/>
              <Route exact path="/contact" component={ Contact }/>
              <Route exact path="/error" component={ Error }/>
              <PrivateRoute exact path="/activity" component={ Activity }/>
              <PrivateRoute exact path="/account" component={ Account }/>
              <PrivateRoute exact path="/exchange-reservation" component={ Rreservation }/>
              <Route component={ Error404 }/>
          </Switch>
      </Router>
      </>
  );
};

export default MyRouts;