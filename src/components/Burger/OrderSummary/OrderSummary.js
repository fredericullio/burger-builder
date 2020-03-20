import React, { Component } from "react";

import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

  componentDidUpdate() {
    console.log("[OrderSummary] DidUpdate");
  }

  ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => (
    <li key={ingKey}>
      <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:
      {" " + this.props.ingredients[ingKey]}
    </li>
  ));
  render() {
    console.log(this.props.ingredients);
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{this.ingredientSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
  
}

export default OrderSummary;
