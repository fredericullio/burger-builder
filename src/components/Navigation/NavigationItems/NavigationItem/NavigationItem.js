import React from "react";

import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnDesktop: {
    height: "70px",
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
    borderRadius: 0,
    borderBottom: "4px solid transparent",
    "&:hover": {
      borderBottom: "4px solid #40a4c8",
      backgroundColor: "#8F5E1E",
    },
    height: "100%",
  },
  btnMobile: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
  active: {
    borderBottom: "4px solid #40a4c8",
    backgroundColor: "#8F5E1E",
    height: "100%",
    boxSizing: "border-box",
    "&:hover": {
      border: "auto"
    }
  },
}));

const NavigationItem = (props) => {
  const classes = useStyles();
  return (
    <NavLink exact activeClassName={classes.active} to={props.link} style={{ textDecoration: "none" }}>
      <Button
        fullWidth={props.desktop ? false : true}
        className={props.desktop ? classes.btnDesktop : classes.btnMobile}
      >
        {props.children}
      </Button>
    </NavLink>
  );
};

export default NavigationItem;
