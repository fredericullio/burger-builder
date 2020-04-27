import React, { Component } from "react";
import { Route } from "react-router-dom";

import ContactData from "./ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: null,
    contactDataOn: false,
    totalPrice: 0,
  };

  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
    this.setState({ contactDataOn: true });
  };

  closeDataInput = () => {
    this.setState({ contactDataOn: false });
  };

  render() {
    return (
      <React.Fragment>
        <CheckoutSummary
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              on={this.state.contactDataOn}
              off={this.closeDataInput}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Checkout;
