import React from "react";

import Burger from "../../Burger/Burger";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  btn: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

const CheckoutSummary = (props) => {
  const classes = useStyles();

  return (
    <Box
    height= "calc(100vh - 70px)"
      width="100%"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      boxSizing="border-box"
    >
      <Typography align="center" variant="h1">Bon Apetit!</Typography>
      <Box width="100%" mx="auto">
        <Burger ingredients={props.ingredients} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        pb="20px"
      >
        <Button
          onClick={props.checkoutCancel}
          className={classes.btn}
          color="secondary"
          variant="contained"
        >
          CANCEL
        </Button>
        <Button
          onClick={props.checkoutContinue}
          className={classes.btn}
          color="primary"
          variant="contained"
        >
          CONTINUE
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutSummary;
