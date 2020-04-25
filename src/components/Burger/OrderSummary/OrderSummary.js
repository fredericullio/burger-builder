import React, { Component } from "react";

// import Button from "../../UI/Button/Button";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  btn: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 0,
    marginRight: "5px",
  },
});

class OrderSummary extends Component {
  //doesn't have to be a class

  componentDidUpdate() {
    console.log("[OrderSummary] DidUpdate");
  }

  render() {
    const { classes } = this.props;

    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingKey) => (
        <li key={ingKey}>
          <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
          {this.props.ingredients[ingKey]}
        </li>
      )
    );
    return (
      <Paper elevation={10} style={{ padding: "50px" }}>
        <Typography variant="h4">Your Order</Typography>
        <Typography>
          A delicious burger with the following ingredients:
        </Typography>
        <List>{ingredientSummary}</List>
        <Typography>
          <Box component="span" fontWeight="bold">
            Total price: ${this.props.price.toFixed(2)}
          </Box>
          <br /> Continue to checkout?
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between" mt="20px">
          <Button
            className={classes.btn}
            onClick={this.props.purchaseCanceled}
            color="secondary"
          >
            CANCEL
          </Button>
          <Button
            className={classes.btn}
            onClick={this.props.purchaseContinued}
            color="primary"
          >
            CONTINUE
          </Button>
        </Box>
      </Paper>
    );
  }
}

export default withStyles(styles)(OrderSummary);
