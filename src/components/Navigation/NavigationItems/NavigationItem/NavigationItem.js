import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  btnDesktop: {
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
    borderRadius: 0,
    borderBottom: "4px solid transparent",
    "&:hover, .active": {
      borderBottom: "4px solid #40a4c8",
      backgroundColor: "#8F5E1E",
    },
    height: "100%",
  },
  btnMobile: {
      color: theme.palette.secondary.main,
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: "transparent"
      }

  }
}));

const NavigationItem = (props) => {
  const classes = useStyles();
  return (
      <Button
        fullWidth={props.desktop ? false : true}
        className={props.desktop ? classes.btnDesktop : classes.btnMobile}
        href={props.link}
      >
        {props.children}
      </Button>
  );
};

export default NavigationItem;
