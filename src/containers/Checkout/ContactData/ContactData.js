import React, { Component } from "react";

import { Box, Typography, TextField, Button } from "@material-ui/core";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };

  render() {
    return (
      <Box m="20px auto" width={{ xs: "80%", md: "500px" }}>
        <Typography align="center" variant="h4">
          Enter your contact data.
        </Typography>
        <form>
          <TextField label="Name" type="text" variant="outlined" />
          <TextField label="E-mail" type="email" variant="outlined" />
          <TextField label="Street" type="text" variant="outlined" />
          <TextField label="Postal code" type="text" variant="outlined" />
          <Button color="primary">ORDER</Button>
        </form>
      </Box>
    );
  }
}

export default ContactData;
