import actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    loading: false
};


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: {
            return {...state, loading: true, error: null}
        }
        case actionTypes.AUTH_SUCCESS: {
            return {...state, token: action.token, userId: action.userId, email: action.email, error: null, loading: false}
        }
        case actionTypes.AUTH_FAILURE: {
            return {...state, error: action.err, loading: false}
        }
        case actionTypes.AUTH_LOGOUT: {
            return {...state, userId: null, token: null, email: null}
        }
        default:
            return state;

    }
}

export default authReducer;