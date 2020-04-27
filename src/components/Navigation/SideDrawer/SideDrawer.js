import React, { Fragment } from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
// import classes from "./SideDrawer.module.css";
// import Backdrop from "../../UI/Backdrop/Backdrop";

import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyItems: "space-around",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const SideDrawer = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Backdrop style={{zIndex: 1}} open={props.open} onClick={props.closed} />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <IconButton onClick={props.closed}>
          <Box height="100px" mx="auto">
            <Logo />
          </Box>
        </IconButton>
        <NavigationItems/>
      </Drawer>
    </Fragment>
  );
};

export default SideDrawer;

// <div className={attachedClasses.join(' ')}>
//   <div className={classes.Logo}>
//     <Logo />
//   </div>
//   <nav>
//     <NavigationItems />
//   </nav>
// </div>
