import actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const removeIngredient = (ingredientType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType,
  };
};

export const setIngredients = (data) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: data.Ingredients,
    totalPrice: data.price
  };
};

export const initIngredients = () => (dispatch) => {
  axios
    .get('https://burger-builder-13728.firebaseio.com/init.json')
    .then((res) => {
      dispatch(setIngredients(res.data));
    })
    .catch(() => this.setState(fetchIngredientsFailed()));
};
