import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const useStyles = makeStyles({
  buildControls: {
    boxShadow: "0 2px 1px 10px 0 #ccc",
    padding: "10px 0",
  },
});

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Tomato", type: "tomato" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      bgcolor="#CF8F2E"
      m="auto"
      pt="10px"
      pr="0"
      className={classes.buildControls}
    >
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          removed={() => props.ingredientRemoved(ctrl.type)}
          added={() => props.ingredientAdded(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <Button
      variant="contained"
      size="large"
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}
      >
        ORDER NOW!
      </Button>
    </Box>
  );
};

export default BuildControls;
