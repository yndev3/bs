import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importing all the themes
import ThemeOne from '../themes/theme-one';
import ExploreWatches from '../themes/explore-one';
import ExploreJewelrys from '../themes/explore-two';
import ExploreMaterials from '../themes/explore-three';
import ItemDetails from '../themes/item-details';
import Activity from '../themes/activity';
import WalletConnect from '../themes/wallet-connect';
import Create from '../themes/create';
import Contact from '../themes/contact';
import AdminItemDetails from '../themes/admin-item-details';
import AdminItemList from '../themes/admin-item-list';
import Account from '../themes/account';
import Error from '../themes/error';


const MyRouts = () => {
  return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={ ThemeOne }/>
            <Route exact path="/explore-watches" component={ ExploreWatches }/>
            <Route exact path="/explore-jewelrys" component={ ExploreJewelrys }/>
            <Route exact path="/explore-materials" component={ ExploreMaterials }/>
            <Route exact path="/item-details/:id" component={ ItemDetails }/>
            <Route exact path="/item-details" component={ ItemDetails }/>
            <Route exact path="/activity" component={ Activity }/>
            <Route exact path="/wallet-connect" component={ WalletConnect }/>
            <Route exact path="/contact" component={ Contact }/>

            <Route exact path="/account" component={ Account }/>
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