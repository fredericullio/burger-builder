import actionTypes from './actionTypes';

import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFailure = (err) => {
  return {
    type: actionTypes.AUTH_FAUIURE,
    err,
  };
};

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwgQ6cnsYs_861kUsHVCJiWxfaLMwo0p4',
      authData
    )
    .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
   } )
    .catch((err) => {});
};
