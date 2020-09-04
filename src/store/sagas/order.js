import { put } from 'redux-saga/effects';
import * as actions from '../actions';

import axios from '../../axios-orders';

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());

  try {
    const res = yield axios.get(
      '/orders.json?auth=' +
        action.token +
        '&orderBy="userId"&equalTo="' +
        action.userId +
        '"'
    );
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFailure(err.response.data.error));
  }
}

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    yield localStorage.removeItem('ingredients');
    yield localStorage.removeItem('price');
    yield put(actions.purchaseBurgerSuccess());
    yield put(actions.initIngredients());
  } catch (err) {
    yield put(actions.purchaseBurgerFailure(err.response.data.error));
  }
}
