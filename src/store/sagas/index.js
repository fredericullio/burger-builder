import { takeEvery, all } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStatusSaga,  } from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {fetchOrdersSaga, purchaseBurgerSaga} from './order';
import actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATUS, authCheckStatusSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}

export default function* rootSaga() {
    yield all([
        watchAuth(),
        watchBurgerBuilder(),
        watchOrder()
    ])
}