import React from "react";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const ControlButton = withStyles((theme) => ({
  root: {
    display: "block",
    font: "inherit",
    padding: "5px",
    margin: "0 5px",
    width: "80px",
    border: "1px solid #AA6817",
    cursor: "pointer",
    outline: "none",
    borderRadius: 0
  },
}))(Button);

const useStyles = makeStyles({
  less: {
    backgroundColor: "#D39952",
    color: "white",
    "&:hover": {
      backgroundColor: "#DAA972",
      color: "white",
    },
  },
  more: {
    backgroundColor: "#8F5E1E",
    color: "white",
    "&:hover": {
      backgroundColor: "#99703F",
      color: "white",
    },
  },
  
});

const BuildControl = (props) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      mt="5px"
      mr={0}
    >
      <Box p="10px" fontWeight="bold" width="80px">
        {props.label}
      </Box>
      <ControlButton
        disabled={props.disabled}
        onClick={props.removed}
        className={classes.less}
      >
        Less
      </ControlButton>
      <ControlButton onClick={props.added} className={classes.more}>
        More
      </ControlButton>
    </Box>
  );
};

export default BuildControl;
