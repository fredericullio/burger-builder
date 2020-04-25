import React from "react";

import Box from "@material-ui/core/Box";

import burgerLogo from "../../assets/images/logo.png";


const logo = props => (
    <Box bgcolor="white" p="8px" height="100%" boxSizing="border-box" borderRadius="100px">
        <img src={burgerLogo}  alt="MyBurger" style={{height:"100%"}}/>
    </Box>
);

export default logo;