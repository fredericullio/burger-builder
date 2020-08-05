import actionTypes from '../actions/actionTypes';

const initialState = {
    purchasing: false,
  };

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ON:
      return { ...state, purchasing: true };
    case actionTypes.PURCHASE_OFF:
      return { ...state, purchasing: false };
    default: 
      return state;
  }
};

export default purchaseReducer;