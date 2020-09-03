import React, { Component } from 'react';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { Box, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import RotatingLogo from '../../../components/UI/RotatingLogo/RotatingLogo';
import ProgressCircle from '../../../components/UI/ProgressCircle/ProgressCircle';
import {
  createConfig,
  checkFormValidity,
  checkFieldValidity,
} from '../../../util/formUtils';
import Form from './createForm/Form';

const styles = (theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.85, 0.85)',
    },
  },
});

class ContactData extends Component {
  state = {
    orderForm: {
      firstName: createConfig('textfield', 'text', 'First Name', ''),
      lastName: createConfig('textfield', 'text', 'Last Name', ''),
      street: createConfig('textfield', 'text', 'Street', ''),
      postalCode: createConfig(
        'textfield',
        'text',
        'Postal Code',
        '',
        null,
        null,
        true
      ),
      email: createConfig('textfield', 'email', 'E-mail', ''),
      delivery: createConfig('select', null, 'Delivery', ''),
    },
    isFormValid: false,
  };

  inputChangeHandler = (event, inputId) => {
    const newOrderForm = {
      ...this.state.orderForm,
    };
    const newFormElement = {
      ...newOrderForm[inputId],
    };
    newFormElement.value = event.target.value;
    const validityCheck = checkFieldValidity(
      newFormElement.value,
      newFormElement.validation
    );
    newFormElement.valid = validityCheck.isValid;
    newFormElement.errorMsg = validityCheck.helperText;

    newFormElement.touched = true;
    newOrderForm[inputId] = newFormElement;
    const prevDeliveryMethod = this.state.orderForm.delivery.value;
    this.setState({ orderForm: newOrderForm });
    setTimeout(() => {
      this.setState({ isFormValid: checkFormValidity(this.state.orderForm) });
      if (inputId === 'delivery') {
        this.props.addDeliveryCost(this.state.orderForm[inputId].value, prevDeliveryMethod);
      }
    }, 10);
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    const keys = Object.keys(this.state.orderForm);
    for (let i = 0; i < keys.length; i++) {
      formData[keys[i]] = this.state.orderForm[keys[i]].value;
    }
    formData.email = this.props.email;
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData: formData,
      userId: this.props.userId,
      date: new Date(),
    };
    this.props.orderBurger(order, this.props.token);
  };

  backBtnHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.props.purchased ? (
          <Redirect to='/' />
        ) : (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='calc(100vh - 70px)'
          >
            <form>
              <Paper
                className={classes.container}
                elevation={10}
                style={{ padding: '20px' }}
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-evenly'
                  height='100%'
                  alignItems='center'
                >
                  {this.props.loading ? (
                    <ProgressCircle style={{ width: '20vh', height: '20vh' }} />
                  ) : (
                    <Box
                      display='flex'
                      flexDirection='column'
                      width={{ xs: '100%', sm: '400px' }}
                      alignItems='center'
                      p='20px'
                    >
                      <RotatingLogo />
                      <Typography align='center' variant='h5'>
                        Enter your contact data
                      </Typography>
                      {this.props.location.pathname === '/contact-data' && (
                        <Redirect to={this.props.match.path + '/1'} />
                      )}
                      <Form
                        isFormValid={this.state.isFormValid}
                        form={this.state.orderForm}
                        pageNumber={2}
                        inputChangeHandler={this.inputChangeHandler}
                        orderHandler={this.orderHandler}
                      />
                    </Box>
                  )}
                </Box>
              </Paper>
            </form>
          </Box>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  price: state.burgerBuilder.totalPrice,
  ingredients: state.burgerBuilder.ingredients,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
  purchased: state.order.purchased,
  email: state.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  orderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
  initIngredients: () => dispatch(actions.initIngredients()),
  addDeliveryCost: (newMethod, oldMethod) => dispatch(actions.addDeliveryCost(newMethod, oldMethod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withErrorHandler(ContactData, axios)));
