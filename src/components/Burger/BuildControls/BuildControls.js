import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import * as actions from '../../../store/actions';
import BuildControl from './BuildControl/BuildControl';

const OrderButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.warning.main,
    outline: 'none',
    border: '1px solid #966909',
    fontFamily: 'inherit',
    fontSize: '1.2em',
    padding: '15px 30px',
    color: theme.palette.secondary.dark,
    boxShadow: '2px 2px 2px #966909',
    transition: 'all 0.3s',
    '&:enabled': {
      animation: '$bump 0.3s',
    },
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
      border: '1px solid #966909',
      color: '#966909',
      cursor: 'pointer',
      transform: 'scale(1.05,1.05)',
      borderRadius: '3px',
    },
    '&:disabled': {
      backgroundColor: theme.palette.grey[500],
      border: '1px solid' + theme.palette.grey[700],
      color: theme.palette.grey[700],
      transform: 'scale(0.9,0.9)',
    },
  },
  '@keyframes bump': {
    '0%': {
      transform: 'scale(1,1)',
    },
    '50%': {
      transform: 'scale(1.2,1.2)',
    },
    '100%': {
      transform: 'scale(1,1)',
    },
  },
}))(Button);

const styles = (theme) => ({
  btn: {
    display: 'none',
    color: 'white',
    position: 'relative',
    cursor: 'pointer',
    margin: '10px',
    padding: '10px',
    transition: 'all 0.5s',
    height: '20px',
    width: '100px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  animationRotate: {
    animation: '$rotate 0.3s ease-out',
  },
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)'
    },
    to: {
      transform: 'rotate(359deg)'
    }
  },
});

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Tomato', type: 'tomato' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

class BuildControls extends Component {
  state = {
    animation: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.price !== this.props.price) {
      this.setState({ animation: true });
      setTimeout(() => this.setState({ animation: false }), 300);
    }
  }

  render() {
    const { classes } = this.props;
    const disabledInfo = {
      ...this.props.ingredients,
    };
    const disabledInfoKeys = Object.keys(disabledInfo);
    for (let i = 0; i < disabledInfoKeys.length; i++) {
      disabledInfo[disabledInfoKeys[i]] =
        disabledInfo[disabledInfoKeys[i]] === 0;
    }
    return (
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        width='100%'
        bgcolor='secondary.light'
        margin={0}
        pt='10px'
        pr='0'
        pb='10px'
        boxShadow={3}
        boxSizing='border-box'
      >
        <Box
          color='#966909'
          borderRadius='5px'
          p='10px'
          bgcolor='warning.main'
          boxShadow='#403f3e 1px 1.5px 5px'
          margin={{xs: 0, sm: '15px'}}
          fontSize={{xs: 15, sm: 25}}
        >
            Current price:
            <Box component='span' display='inline-block' mx='10px' fontWeight='bold' color='info.main' className={
              this.state.animation
                ? classes.animationRotate
                : null
            }>
              {` $${this.props.price.toFixed(2)}`}
            </Box>
        </Box>
        {controls.map((ctrl) => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            removed={() => this.props.onRemoveIngredient(ctrl.type)}
            added={() => this.props.onAddIngredient(ctrl.type)}
            disabled={disabledInfo[ctrl.type]}
          />
        ))}
        <span
          style={{
            cursor: !this.props.purchasable ? 'not-allowed' : 'pointer',
          }}
        >
          <OrderButton
            variant='contained'
            size='large'
            onClick={this.props.purchaseOn}
            disabled={!this.props.purchasable}
          >
            ORDER NOW!
          </OrderButton>
        </span>
        <div className={classes.btn}>
          <span>testing</span>
        </div>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientType) =>
      dispatch(actions.addIngredient(ingredientType)),
    onRemoveIngredient: (ingredientType) =>
      dispatch(actions.removeIngredient(ingredientType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BuildControls));
