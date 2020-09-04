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
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  compareDates = (a, b) => {
    if (a.date > b.date) return -1;
    else if (a.date < b.date) return 1;
    return 0;
  };

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
          <Box width={{ xs: '100%', sm: 'auto' }} height='100%'>
            <List>
              {this.props.orders.sort(this.compareDates).map((order) => (
                <Order
                data={order.formData}
                  key={order.id}
                  id={order.id}
                  price={+order.price}
                  date={order.date}
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
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
