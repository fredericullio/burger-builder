import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const StyledBtn = withStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 0,
    marginRight: '5px',
  },
}))(Button);

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingKey) => (
      <li key={ingKey}>
        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
        {props.ingredients[ingKey]}
      </li>
    )
  );
  return (
    <Paper elevation={10} style={{ padding: '50px' }}>
      <Typography variant='h4' align='center'>Your Order</Typography>
      <Typography>
        A delicious burger with the following ingredients:
      </Typography>
      <List>{ingredientSummary}</List>
      <Typography>
        <Box component='span' fontWeight='bold'>
          Total price: ${props.price.toFixed(2)}
        </Box>
        <br /> Continue to checkout?
      </Typography>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        mt='20px'
      >
        <StyledBtn onClick={props.purchaseOff} color='secondary'>
          CANCEL
        </StyledBtn>
        <StyledBtn onClick={props.isAuthenticated ? props.purchaseContinued : () => props.history.push('/sign-in')} color='primary'>
          {props.isAuthenticated ? 'CONTINUE' : 'SIGN IN'}
        </StyledBtn>
      </Box>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseOff: () => dispatch(actions.purchaseOff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderSummary));
