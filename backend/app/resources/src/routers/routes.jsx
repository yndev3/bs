import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importing all the themes

import WalletConnect from '../themes/wallet-connect';
import Create from '../themes/create';
import AdminItemDetails from '../themes/item-details';
import AdminItemList from '../themes/item-list';
import PurchaseList from '../themes/purchase-list';
import ReservationList from '../themes/reservation-list';
import StoreList from '../themes/store-list';
import Error from '../themes/error';

import RedirectIfNotConnected from './Redirect';

const MyRouts = () => {
  return (
      <>
        <Router>
          <Switch>

            <Route exact path="/" component={ WalletConnect }/>

            <RedirectIfNotConnected>
              <Route exact path="/admin/create" component={ Create }/>
              <Route exact path="/admin/itemDetails/:id" component={ AdminItemDetails }/>
              <Route exact path="/admin/itemlist" component={ AdminItemList }/>
              <Route exact path="/admin/purchase" component={ PurchaseList}/>
              <Route exact path="/admin/reservationlist" component={ ReservationList }/>
              <Route exact path="/admin/storelist" component={ StoreList}/>
              <Route exact path="/error" component={ Error }/>
            </RedirectIfNotConnected>

          </Switch>
        </Router>
      </>
  );
};
export default MyRouts;