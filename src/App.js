import React, { useEffect, 
  // lazy, Suspense 
} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import { AnimatedSwitch, spring } from 'react-router-transition';

import Layout from './hoc/Layout/Layout';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import ContactData from './containers/Checkout/ContactData/ContactData';

// const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
// const Orders = lazy(() => import('./containers/Orders/Orders'));
// const Auth = lazy(() => import('./containers/Auth/Auth'));
// const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

const bounce = (val) => {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
};

const mapStyles = (styles) => {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
};

const App = (props) => {
  useEffect(() => {
    props.checkAuthStatus();
  }, [props]);

  const routes = props.isAuthenticated ? (
    <AnimatedSwitch
      atEnter={{ opacity: 0, scale: 1.2 }}
      atLeave={{ opacity: bounce(0), scale: bounce(0.8) }}
      atActive={{ opacity: bounce(1), scale: bounce(1) }}
      mapStyles={mapStyles}
      className='switch-wrapper'
    >
      {/* <Suspense fallback={null}> */}
        <Route path='/contact-data' component={ContactData} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/sign-in' component={Auth} />
        <Route exact path='/' component={BurgerBuilder} />
      {/* </Suspense> */}
    </AnimatedSwitch>
  ) : (
    <AnimatedSwitch
      atEnter={{ opacity: 0, scale: 1.2 }}
      atLeave={{ opacity: bounce(0), scale: bounce(0.5) }}
      atActive={{ opacity: bounce(1), scale: bounce(1) }}
      mapStyles={mapStyles}
      className='switch-wrapper'
    >
      {/* <Suspense fallback={null}> */}
        <Route path='/sign-in' component={Auth} />
        <Route exact path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      {/* </Suspense> */}
    </AnimatedSwitch>
  );

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
  purchasable: state.burgerBuilder.purchasable,
});

const mapDispatchToProps = (dispatch) => ({
  checkAuthStatus: () => dispatch(actions.checkAuthStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
