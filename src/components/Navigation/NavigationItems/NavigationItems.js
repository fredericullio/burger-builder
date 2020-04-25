import React from "react";

import Box from "@material-ui/core/Box";

import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
  <Box display="flex" flexDirection={props.desktop ? "row" : "column"} mx="auto">
    <NavigationItem active link="/" desktop={props.desktop}>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/" desktop={props.desktop}>Checkout</NavigationItem>
  </Box>

  //   <React.Fragment>
  //     <NavigationItem link="/" active>
  //       Burger Builder
  //     </NavigationItem>
  //     <NavigationItem link="/">Checkout</NavigationItem>
  //   </React.Fragment>
);

export default NavigationItems;
