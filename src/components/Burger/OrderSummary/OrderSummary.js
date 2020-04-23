import React, { Component, Fragment } from "react";

// import Button from "../../UI/Button/Button";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

class OrderSummary extends Component {
  //doesn't have to be a class

  componentDidUpdate() {
    console.log("[OrderSummary] DidUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingKey) => (
        <li key={ingKey}>
          <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
          {this.props.ingredients[ingKey]}
        </li>
      )
    );
    return (
      <Fragment>
        <Typography variant="h4">Your Order</Typography>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <Typography>
          <Box variant="span" fontWeight="bold">Total price: ${this.props.price.toFixed(2)}</Box>
        
         Continue to checkout?</Typography>
          <Button onClick={this.props.purchaseCanceled} color="secondary">
            <Box fontWeight="bold" fontSize={16}>CANCEL</Box>
          </Button>
          <Button onClick={this.props.purchaseContinued} color="primary">
            <Box fontWeight="bold" fontSize={16}>CONTINUE</Box>
          </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
