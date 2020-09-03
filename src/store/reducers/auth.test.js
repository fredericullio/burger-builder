import authReducer from './auth';
import actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      email: null,
      loading: false,
    });
  });
  it('should store a token upon login', () => {
    expect(
      authReducer(
        {
          token: null,
          userId: null,
          email: null,
          error: null,
          loading: false,
        },
        { type: actionTypes.AUTH_SUCCESS, userId: '1234', token: '000', email: 'aaa@aaa.com' }
      )
    ).toEqual({
      token: '000',
      userId: '1234',
      email: 'aaa@aaa.com',
      error: null,
      loading: false,
    });
  });
});
