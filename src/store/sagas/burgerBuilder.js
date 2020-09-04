import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
  const price = yield localStorage.getItem('price');
  const ingredients = yield localStorage.getItem('ingredients');

  if (price && ingredients) {
    yield put(
      actions.setIngredients({
        Ingredients: JSON.parse(localStorage.getItem('ingredients')),
        price: Number(localStorage.getItem('price')),
      })
    );
  } else {
    try {
      const res = yield axios.get(
        'https://burger-builder-13728.firebaseio.com/init.json'
      );
      yield put(actions.setIngredients(res.data));
    } catch(err) {
        yield put(actions.fetchIngredientsFailure());
    }
  }
}
