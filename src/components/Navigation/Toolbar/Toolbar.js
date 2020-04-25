import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: 0,
    margin: 0,
    backgroundColor: "#703B09",
    height: "70px",
    boxSizing: "border-box",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
}));

const ToolbarComponent = (props) => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      className={classes.appBar}
    >
      <Toolbar style={{display: "flex", justifyContent: "space-between", paddingRight: 0}}>
        <Box display={{ sm: "none" }}>
          <IconButton
            color="inherit"
            onClick={props.drawerToggleClicked}
            className={clsx(classes.menuButton, props.open && classes.hide)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Box>

        <Box height="80%" width="80px">
          <Logo />
        </Box>
        <Box display={{ xs: "none", sm: "flex" }} height="100%">
          <NavigationItems desktop />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
