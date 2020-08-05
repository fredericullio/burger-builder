import React from "react";

import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <Box display="flex" flexDirection={props.desktop ? "row" : "column"} mx="auto">
    <NavigationItem active link="/" desktop={props.desktop}>
      <Typography variant='button' style={{fontWeight: 'bold'}}>Burger Builder</Typography>
    </NavigationItem>
    <NavigationItem link="/orders" desktop={props.desktop}><Typography variant='button' style={{fontWeight: 'bold'}}>Orders</Typography></NavigationItem>
  </Box>

  //   <React.Fragment>
  //     <NavigationItem link="/" active>
  //       Burger Builder
  //     </NavigationItem>
  //     <NavigationItem link="/">Checkout</NavigationItem>
  //   </React.Fragment>
);

export default NavigationItems;
