import { put } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';

export function* logoutSaga(action) {
    yield localStorage.clear();
    yield put({type: actionTypes.AUTH_LOGOUT});

} 