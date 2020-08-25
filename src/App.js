import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import "./App.css";

const App = props => {
  useEffect(() => {
    props.checkAuthStatus();
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path='/sign-in' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  checkAuthStatus: () => dispatch(actions.checkAuthStatus())
});

export default withRouter(connect(null, mapDispatchToProps)(App));
