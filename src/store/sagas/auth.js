import { put, delay } from 'redux-saga/effects';

import axios from 'axios';

import * as actions from '../actions';

export function* logoutSaga(action) {
  yield localStorage.clear();
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  try {
    const res = yield axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${
        action.isSignIn ? 'signInWithPassword' : 'signUp'
      }?key=AIzaSyCwgQ6cnsYs_861kUsHVCJiWxfaLMwo0p4`,
      authData
    );
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
        
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('userId', res.data.localId);
    yield localStorage.setItem('email', res.data.email);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield put(
      actions.authSuccess(res.data.idToken, res.data.localId, res.data.email)
    );
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFailure(err.response.data.error));
  }
}

export function* authCheckStatusSaga(action) {
  const token = yield localStorage.getItem('token');
  const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

  if (token && expirationDate > new Date()) {
    yield put(
      actions.authSuccess(
        token,
        localStorage.getItem('userId'),
        localStorage.getItem('email')
      )
    );
    yield put(
      actions.checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      )
    );
  }
}
