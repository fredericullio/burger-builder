import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  useEffect(() => {
    props.initIgredients();
    props.logout();
  }, []);

  return <Redirect to='/' />;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
  initIgredients: () => dispatch(actions.initIngredients())
});

export default connect(null, mapDispatchToProps)(Logout);
