import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import {connect} from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import * as actions from '../../store/actions';

class Checkout extends Component {
  state = {
    contactDataOn: false,
  };

  UNSAFE_componentWillMount () {
    this.props.purchaseInit();
  }

  checkoutCancelHandler = () => {
    this.props.history.push('/');
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/contact-data");
    this.setState({ contactDataOn: true });
  };

  closeDataInput = () => {
    this.setState({ contactDataOn: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.ingredients && !this.props.purchased ? <React.Fragment><CheckoutSummary
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.props.ingredients}
        /></React.Fragment> : <Redirect to='/' />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => ({
  purchaseInit: () => dispatch(actions.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
