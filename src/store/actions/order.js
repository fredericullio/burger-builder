import actionTypes from './actionTypes';
import * as actions from '../actions';

import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then((res) => {
      dispatch(purchaseBurgerSuccess());
      dispatch(actions.purchaseOff());
      dispatch(actions.initIngredients());
    })
    .catch((err) => dispatch(purchaseBurgerFailure(err)));
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFailure = err => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILURE,
    err
  }
}

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart());
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
        dispatch(fetchOrdersSuccess(fetchedOrders));
        // this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        dispatch(fetchOrdersFailure(err));
        // this.setState({ loading: false });
      });
}
