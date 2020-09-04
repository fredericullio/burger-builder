import React from 'react';
import { withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import BurgerIngredient from './BurgerIngedient/BurgerIngredient';

const useStyles = makeStyles((theme) => ({
  fadeEnter: {
    transform: 'scale(1.3)',
  },
  fadeEnterActive: {
    transform: 'scale(1)',
    transition: 'all 0.5s ease-in-out',
  },
  fadeExit: {
    transform: 'scale(1.3) rotate(280deg)',
  },
  fadeExitActive: {
    transform: 'scale(0)',
    transition: 'all 0.5s',
  },
}));

const Burger = (props) => {
  const classes = useStyles();
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return (
          <CSSTransition
            mountOnEnter
            unmountOnExit
            key={ingKey + index}
            classNames={{
              enter: classes.fadeEnter,
              enterActive: classes.fadeEnterActive,
              exit: classes.fadeExit,
              exitActive: classes.fadeExitActive,
            }}
            timeout={500}
          >
            <BurgerIngredient scale={props.scale} type={ingKey} />
          </CSSTransition>
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  return (
    <Box
      textAlign='center'
      boxSizing='border-box'
      fontWeight='bold'
      fontSize='1.2rem'
      p='20px 0 20px'
      m='auto'
    >
      <BurgerIngredient scale={props.scale} type='bread-top' />
     
        <TransitionGroup>{transformedIngredients}</TransitionGroup>
     
        {transformedIngredients.length < 1 && <p>Please start adding ingredients!</p>}
   

      <BurgerIngredient scale={props.scale} type='bread-bottom' />
    </Box>
  );
};

export default withRouter(Burger);
