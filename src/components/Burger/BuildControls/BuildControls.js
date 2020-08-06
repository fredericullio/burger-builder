import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as actions from '../../../store/actions';
import BuildControl from './BuildControl/BuildControl';

const OrderButton = withStyles((theme) => ({
  root: {
    backgroundColor: '#DAD735',
    outline: 'none',
    border: '1px solid #966909',
    fontFamily: 'inherit',
    fontSize: '1.2em',
    padding: '15px 30px',
    color: '#966909',
    boxShadow: '2px 2px 2px #966909',
    '&:hover': {
      backgroundColor: '#A0DB41',
      border: '1px solid #966909',
      color: '#966909',
      cursor: 'pointer',
    },
    '&:disabled': {
      backgroundColor: '#C7C6C6',
      border: '1px solid #ccc',
      color: '#888888',
    },
  },
}))(Button);

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Tomato', type: 'tomato' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
  const theme = useTheme();
  const disabledInfo = {
    ...props.ingredients,
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
      bgcolor={theme.palette.secondary.light}
      margin={0}
      pt='10px'
      pr='0'
      pb='10px'
      boxShadow={3}
      boxSizing='border-box'
    >
      <Typography>
        Current price:
        <Box component='span' fontWeight='bold'>
          {` $${props.price.toFixed(2)}`}
        </Box>
      </Typography>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          removed={() => props.onRemoveIngredient(ctrl.type)}
          added={() => props.onAddIngredient(ctrl.type)}
          disabled={disabledInfo[ctrl.type]}
        />
      ))}
      <span style={{ cursor: !props.purchasable ? 'not-allowed' : 'pointer' }}>
        <OrderButton
          variant='contained'
          size='large'
          onClick={props.purchaseOn}
          disabled={!props.purchasable}
        >
          ORDER NOW!
        </OrderButton>
      </span>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    purchasing: state.purchase.purchasing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientType) =>
      dispatch(actions.addIngredient(ingredientType)
        
      ),
    onRemoveIngredient: (ingredientType) =>
      dispatch(actions.removeIngredient(ingredientType)),
    purchaseOn: () => dispatch(actions.purchaseOn())
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
