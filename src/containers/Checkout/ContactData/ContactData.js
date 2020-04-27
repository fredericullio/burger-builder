import React, { Component } from "react";
import axios from "../../../axios-orders";

import { Box, Typography, TextField, Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Modal from "../../../components/UI/Modal/Modal";
import ProgressCircle from "../../../components/UI/ProgressCircle/ProgressCircle";

const DataButton = withStyles((theme) => ({
  root: {
    fontWeight: "bold",
    fontSize: 16,
  },
}))(Button);

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Maciej Kuchta",
        address: {
          street: "some street",
          postalCode: "postal",
        },
        country: "Poland",
        email: "some@mailbox.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        console.log(order);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <Modal show={this.props.on} modalClosed={this.props.off}>
        <Box width={{ xs: "80%", md: "500px" }}>
          <form>
            <Paper elevation={10} style={{ height: "500px" }}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                height="100%"
                width="70%"
                m="auto"
              >
                {this.state.loading ? (
                  <ProgressCircle />
                ) : (
                  <React.Fragment>
                    <Typography align="center" variant="h4">
                      Enter your contact data.
                    </Typography>
                    <TextField
                      fullWidth
                      label="Name"
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="E-mail"
                      type="email"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Street"
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Postal code"
                      type="text"
                      variant="outlined"
                    />
                    <DataButton
                      onClick={this.orderHandler}
                      variant="contained"
                      color="secondary"
                    >
                      ORDER
                    </DataButton>
                  </React.Fragment>
                )}
              </Box>
            </Paper>
          </form>
        </Box>
      </Modal>
    );
  }
}

export default ContactData;
