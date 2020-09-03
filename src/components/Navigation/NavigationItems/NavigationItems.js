import React from "react";

import { connect } from 'react-redux';

import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';

import NavigationItem from "./NavigationItem/NavigationItem";

export const NavigationItems = (props) => (
  <Box display="flex" flexDirection={props.desktop ? "row" : "column"} mx="auto" height={props.desktop ?  'initial' : props.isAuthenticated ? '90px' : '60px'} justifyContent={props.desktop ? 'initial' : 'space-between'}>
    <NavigationItem onClick={!props.desktop ? props.closeSideDrawer : null} active link="/" desktop={props.desktop}>
      <Typography variant='button' style={{fontWeight: 'bold'}}>Burger Builder</Typography>
    </NavigationItem>
    {props.isAuthenticated && <NavigationItem onClick={!props.desktop ? props.closeSideDrawer : null} link="/orders" desktop={props.desktop}><Typography variant='button' style={{fontWeight: 'bold'}}>Orders</Typography></NavigationItem>}
  <NavigationItem onClick={!props.desktop ? props.closeSideDrawer : null} link={props.isAuthenticated ? '/logout' : "/sign-in"} desktop={props.desktop}><Typography variant='button' style={{fontWeight: 'bold'}}>{props.isAuthenticated ? 'Logout' : 'Sign Up / Sign In'}</Typography></NavigationItem>
  </Box>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(NavigationItems);
