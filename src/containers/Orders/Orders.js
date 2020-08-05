import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import ProgressCircle from '../../components/UI/ProgressCircle/ProgressCircle';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  ordrContainer: {
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #D39952',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#8F5E1E',
      borderRadius: '10px',
    },
  },
});

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Box
        className={classes.ordrContainer}
        display='flex'
        alignItems='center'
        justifyContent='center'
        overflow='auto'
        height='calc(100vh - 72px)'
        width='100%'
      >
        {this.state.loading ? (
          <ProgressCircle style={{ height: '20vw', width: '20vw' }} />
        ) : (
          <Box width={{ xs: '90%', sm: 'auto' }} height='100%'>
            <List>
              {this.state.orders.map((order) => (
                <Order
                  key={order.id}
                  price={+order.price}
                  ingredients={order.ingredients}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>
    );
  }
}

export default (withStyles(styles)(withErrorHandler(Orders, axios)));
