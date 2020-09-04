import actionTypes from './actionTypes';

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }

};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INIT_LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    email
  };
};

export const authFailure = (err) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    err,
  };
};

export const auth = (email, password, isSignIn) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignIn
  }
};

export const checkAuthStatus = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATUS
  }
};
