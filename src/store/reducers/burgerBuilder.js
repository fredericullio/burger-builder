import actionTypes from '../actions/actionTypes';

const updatePurchaseState = (ingredients) => {
  return (
    Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0) > 0
  );
};

const DELIVERY_COST = {
  fastest: 1,
  cheapest: 0.5,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6,
  tomato: 0.5,
};

const initialState = {
  ingredients: null,
  totalPrice: -1,
  purchasable: false,
  error: false,
};

let updatedIngredients = null;

const brgBldrReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      updatedIngredients = {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
      };
      localStorage.setItem(
        'price',
        state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      );
      localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
        ingredients: updatedIngredients,
        purchasable: updatePurchaseState(updatedIngredients),
      };
    case actionTypes.REMOVE_INGREDIENT:
      updatedIngredients = {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
      };
      localStorage.setItem(
        'price',
        state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
      );
      localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
        ingredients: updatedIngredients,
        purchasable: updatePurchaseState(updatedIngredients),
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: action.totalPrice,
        error: false,
        purchasable: updatePurchaseState(action.ingredients),
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return { ...state, error: true };
    case actionTypes.ADD_DELIVERY_COST:
      const newPrice = action.oldMethod
        ? state.totalPrice -
          DELIVERY_COST[action.oldMethod] +
          DELIVERY_COST[action.newMethod]
        : state.totalPrice + DELIVERY_COST[action.newMethod];
      return { ...state, totalPrice: newPrice };
    default:
      return state;
  }
};

export default brgBldrReducer;
