import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import BuildControl from "./BuildControl/BuildControl";

const OrderButton = withStyles((theme) => ({
  root: {
    backgroundColor: "#DAD735",
    outline: "none",
    border: "1px solid #966909",
    fontFamily: "inherit",
    fontSize: "1.2em",
    padding: "15px 30px",
    color: "#966909",
    boxShadow: "2px 2px 2px #966909",

    "&:hover, &:active": {
      backgroundColor: "#A0DB41",
      border: "1px solid #966909",
      color: "#966909",
      cursor: "pointer",
    },
    "&:disabled": {
      backgroundColor: "#C7C6C6",
      border: "1px solid #ccc",
      color: "#888888",
    },
  },
}))(Button);

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Tomato", type: "tomato" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      bgcolor="#CF8F2E"
      margin={0}
      pt="10px"
      pr="0"
      pb="10px"
      boxShadow={3}
      boxSizing="border-box"
    >
      <Typography>
        Current price:
        <Box component="span" fontWeight="bold">
          {` $${props.price.toFixed(2)}`}
        </Box>
      </Typography>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          removed={() => props.ingredientRemoved(ctrl.type)}
          added={() => props.ingredientAdded(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <span style={{cursor: !props.purchasable ? "not-allowed" : "pointer"}}>
      <OrderButton
        variant="contained"
        size="large"
        onClick={props.ordered}
        disabled={!props.purchasable}
      >
        
        ORDER NOW!
      </OrderButton>
      </span>
    </Box>
  );
};

export default BuildControls;
