import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from '@material-ui/core/Box';

import BurgerIngredient from './BurgerIngedient/BurgerIngredient';


const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return <BurgerIngredient key={ingKey + index} type={ingKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <Box
      textAlign='center'
      boxSizing='border-box'
      fontWeight='bold'
      fontSize='1.2rem'
      p='20px 0 20px'
      m='auto'
    >
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  };
}

export default connect(mapStateToProps)(withRouter(Burger));
