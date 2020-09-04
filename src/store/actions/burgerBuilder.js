import actionTypes from './actionTypes';

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType,
  };
};

export const fetchIngredientsFailure = () => {
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
    totalPrice: data.price,
  };
};

export const addDeliveryCost = (newMethod, oldMethod) => {
  return {
    type: actionTypes.ADD_DELIVERY_COST,
    newMethod,
    oldMethod
  }
}

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
};
