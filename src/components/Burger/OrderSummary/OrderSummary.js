import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import RotatingLogo from '../../UI/RotatingLogo/RotatingLogo';

import { withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import PaperButton from '../../UI/PaperButton/PaperButton';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => (
    <li key={ingKey}>
      <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
      {props.ingredients[ingKey]}
    </li>
  ));
  return (
    <Paper elevation={10} style={{ padding: '50px 50px 20px' }}>
      <RotatingLogo />

      <Typography variant='h4' align='center'>
        Your Order
      </Typography>
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
        <PaperButton onClick={props.purchaseOff} color='secondary' variant='contained'>
        CANCEL
        </PaperButton>
        <PaperButton
          onClick={() => {
            props.purchaseOff();
            setTimeout(
              () =>
                props.isAuthenticated
                  ? props.purchaseContinued()
                  : props.history.push('/sign-in'),
              150
            );
          }}
          color='primary'
          variant='contained'
        >
          {props.isAuthenticated ? 'CONTINUE' : 'SIGN IN'}
        </PaperButton>
      </Box>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(
  mapStateToProps
)(withRouter(OrderSummary));
