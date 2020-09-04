import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

// import classes from "./BurgerIngredient.module.css";

const styles = (theme) => ({
  breadBottom: {
    background: 'linear-gradient(#F08E4A, #e27b36)',
    borderRadius: '0 0 30px 30px',
    boxShadow: 'inset -15px 0 #c15711',
  },
  breadTop: {
    background: 'linear-gradient(#bc581e, #e27b36)',
    borderRadius: '50% 50% 0 0',
    boxShadow: 'inset -15px 0 #c15711',
  },
  seeds1: {
    transform: 'rotate(-20deg)',
    boxShadow: 'inset -2px -3px #c9c9c9',
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'white',
      left: '-170%',
      top: '-260%',
      borderRadius: '40%',
      transform: 'rotate(60deg)',
      boxShadow: 'inset -1px 2px #c9c9c9',
    },
    '&:before': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'white',
      left: '180%',
      top: '-50%',
      borderRadius: '40%',
      transform: 'rotate(60deg)',
      boxShadow: 'inset -1px -3px #c9c9c9',
    },
  },
  seeds2: {
    transform: 'rotate(10deg); box-shadow: inset -3px 0 #c9c9c9',
    '&:before': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'white',
      left: '150%',
      top: '-130%',
      borderRadius: '40%',
      transform: 'rotate(90deg)',
      boxShadow: 'inset 1px 3px #c9c9c9',
    },
  },
  meat: {
    background: 'linear-gradient(#7f3608, #702e05)',
  },
  cheese: {
    background: 'linear-gradient(#f4d004, #d6bb22)',
  },
  salad: {
    background: 'linear-gradient(#228c1d, #91ce50)',
  },
  bacon: {
    background: 'linear-gradient(#bf3813, #c45e38)',
  },
  tomato: {
    background: 'linear-gradient(#e61f15,#ed3d34)',
  },
});

class BurgerIngredient extends Component {
  render() {
    const { classes } = this.props;
    let ingredient = null;

    switch (this.props.type) {
      case 'bread-bottom':
        ingredient = (
          <Box
            height={{ xs: `${40/(this.props.scale || 1)}px`, lg: `${80/(this.props.scale || 1)}px` }}
            width={{ xs: `${250/(this.props.scale || 1)}px`, lg: `${500/(this.props.scale || 1)}px` }}
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            mx='auto'
            className={classes.breadBottom}
          />
        );
        break;
      case 'bread-top':
        ingredient = (
          <Box
            height={{ xs: `${75/(this.props.scale || 1)}px`, lg: `${150/(this.props.scale || 1)}px` }}
            width={{ xs: `${260/(this.props.scale || 1)}px`, lg: `${520/(this.props.scale || 1)}px` }}
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            mx='auto'
            position='relative'
            className={classes.breadTop}
          >
            <Box
              width='10%'
              height='15%'
              bgcolor='white'
              position='absolute'
              left='30%'
              top='50%'
              borderRadius='40%'
              className={classes.seeds1}
            />
            <Box
              width='10%'
              height='15%'
              position='absolute'
              bgcolor='white'
              left='64%'
              top='50%'
              borderRadius='40%'
              className={classes.seeds2}
            />
          </Box>
        );
        break;
      case 'meat':
        ingredient = (
          <Box
            width={{ xs: `${240/(this.props.scale || 1)}px`, lg: `${480/(this.props.scale || 1)}px` }}
            height={{ xs: `${25/(this.props.scale || 1)}px`, lg: `${50/(this.props.scale || 1)}px` }}
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            mx='auto'
            borderRadius='15px'
            className={classes.meat}
          />
        );
        break;
      case 'cheese':
        ingredient = (
          <Box
            width={{ xs: `${300/(this.props.scale || 1)}px`, lg: `${600/(this.props.scale || 1)}px` }}
            height={{ xs: `${10/(this.props.scale || 1)}px`, lg: `${20/(this.props.scale || 1)}px` }}
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            mx='auto'
            borderRadius='20px'
            className={classes.cheese}
          />
        );
        break;
      case 'salad':
        ingredient = (
          <Box
            width={{ xs: `${275/(this.props.scale || 1)}px`, lg: `${550/(this.props.scale || 1)}px` }}
            height={{ xs: `${20/(this.props.scale || 1)}px`, lg: `${40/(this.props.scale || 1)}px` }}
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            mx='auto'
            borderRadius='20px'
            className={classes.salad}
          />
        );
        break;
      case 'bacon':
        ingredient = (
          <Box
            width={{ xs: `${265/(this.props.scale || 1)}px`, lg: `${580/(this.props.scale || 1)}px` }}
            height={{ xs: `${6/(this.props.scale || 1)}px`, lg: `${12/(this.props.scale || 1)}px` }}
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            mx='auto'
            className={classes.bacon}
          />
        );
        break;
      case 'tomato':
        ingredient = (
          <Box
            width={{ xs: `${200/(this.props.scale || 1)}px`, lg: `${400/(this.props.scale || 1)}px` }}
            height={{ xs: `${17/(this.props.scale || 1)}px`, lg: `${35/(this.props.scale || 1)}px` }}
            mx='auto'
            mt={{ xs: `${2/(this.props.scale || 1)}px`, lg: `${5/(this.props.scale || 1)}px` }}
            className={classes.tomato}
          />
        );
        break;
      default:
        ingredient = null;
        break;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(BurgerIngredient);
