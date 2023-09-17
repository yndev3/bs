import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importing all the themes

import WalletConnect from '../themes/wallet-connect';
import Create from '../themes/create';
import AdminItemDetails from '../themes/admin-item-details';
import AdminItemList from '../themes/admin-item-list';
import Error from '../themes/error';


const MyRouts = () => {
  return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={ WalletConnect }/>
            <Route exact path="/admin/create" component={ Create }/>
            <Route exact path="/admin/itemDetails/:id" component={ AdminItemDetails }/>
            <Route exact path="/admin/itemlist" component={ AdminItemList }/>

            <Route exact path="/error" component={ Error }/>

          </Switch>
        </Router>
      </>
  );
};
export default MyRouts;