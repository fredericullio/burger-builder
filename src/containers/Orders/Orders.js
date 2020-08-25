import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Order from '../../components/Order/Order';
import ProgressCircle from '../../components/UI/ProgressCircle/ProgressCircle';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        overflow='auto'
        height='calc(100vh - 72px)'
        width='100%'
      >
        {this.props.loading ? (
          <ProgressCircle style={{ height: '20vw', width: '20vw' }} />
        ) : (
          <Box width={{ xs: '90%', sm: 'auto' }} height='100%'>
            <List>
              {this.props.orders.map((order) => (
                <Order
                  key={order.id}
                  id={order.id}
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

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token) => dispatch(actions.fetchOrders(token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
