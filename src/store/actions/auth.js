import actionTypes from './actionTypes';

import axios from 'axios';

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFailure = (err) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    err,
  };
};

export const auth = (email, password, isSignIn) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${
        isSignIn ? 'signInWithPassword' : 'signUp'
      }?key=AIzaSyCwgQ6cnsYs_861kUsHVCJiWxfaLMwo0p4`,
      authData
    )
    .then((res) => {
      const expirationDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );

      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFailure(err.response.data.error));
    });
};

export const checkAuthStatus = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (token && expirationDate > new Date()) {
    dispatch(authSuccess(token, localStorage.getItem('userId')));
    dispatch(
      checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  }
};
