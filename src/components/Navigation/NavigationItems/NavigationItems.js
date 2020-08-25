import React from "react";

import { connect } from 'react-redux';

import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <Box display="flex" flexDirection={props.desktop ? "row" : "column"} mx="auto">
    <NavigationItem active link="/" desktop={props.desktop}>
      <Typography variant='button' style={{fontWeight: 'bold'}}>Burger Builder</Typography>
    </NavigationItem>
    {props.isAuthenticated && <NavigationItem link="/orders" desktop={props.desktop}><Typography variant='button' style={{fontWeight: 'bold'}}>Orders</Typography></NavigationItem>}
  <NavigationItem onClick={props.isAuthenticated ? () => console.log('LOGOUT!!') : null} link={props.isAuthenticated ? '/logout' : "/sign-in"} desktop={props.desktop}><Typography variant='button' style={{fontWeight: 'bold'}}>{props.isAuthenticated ? 'Logout' : 'Sign Up / Sign In'}</Typography></NavigationItem>
  </Box>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(NavigationItems);
