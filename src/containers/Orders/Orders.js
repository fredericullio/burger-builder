import React, { Component } from "react";

import Order from "../../components/Order/Order";
import ProgressCircle from "../../components/UI/ProgressCircle/ProgressCircle";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
        console.log(this.state.orders);
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
        {this.state.loading ? (
          <ProgressCircle />
        ) : (
          <List>
            {this.state.orders.map((order) => (
              <Order
                key={order.id}
                price={+order.price}
                ingredients={order.ingredients}
              />
            ))}
          </List>
        )}
      </Box>
    );
  }
}

export default withErrorHandler(Orders, axios);
