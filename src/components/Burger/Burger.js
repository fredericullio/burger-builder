import React from "react";
import { withRouter } from "react-router-dom";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

// import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngedient/BurgerIngredient";

const useStyles = makeStyles({
  burger: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return <BurgerIngredient key={ingKey + index} type={ingKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  const classes = useStyles();

  return (
    <Box
      className={classes.burger}
      // mx="auto"
      overflow="auto"
      textAlign="center"
      boxSizing="border-box"
      fontWeight="bold"
      fontSize="1.2rem"
      flex=" 0 1 100%"
      pb="20px"
      pt="20px"
      mx="auto"
    >
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </Box>
  );
};

export default withRouter(Burger);
