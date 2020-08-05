import React, { Component } from 'react';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

import { Route, Link, Redirect } from 'react-router-dom';

import { Box, Typography, Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Modal from '../../../components/UI/Modal/Modal';
import ProgressCircle from '../../../components/UI/ProgressCircle/ProgressCircle';
import Input from '../../../components/UI/Input/Input';

const DataButton = withStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    fontSize: 16,
  },
}))(Button);

class ContactData extends Component {
  createConfig = (
    component,
    type,
    label,
    value = '',
    minLength = null,
    maxLength = null
  ) => {
    switch (component) {
      case 'textfield':
        return {
          component: component,
          elementConfig: {
            type: type,
            label: label,
          },
          value: value,
          validation: {
            required: true,
            minLength: minLength,
            maxLength: maxLength,
          },
          valid: false,
          touched: false,
          errorMsg: null,
        };
      case 'select':
        return {
          component: component,
          elementConfig: {
            label: label,
            options: [
              { value: 'fastest', display: 'Fastest' },
              { value: 'cheapest', display: 'Cheapest' },
            ],
          },
          value: value,
          validation: {
            required: true,
          },
          valid: false,
        };
      default:
        return null;
    }
  };



  checkFieldValidity = (value, rules) => {
    let isValid = true;
    let helperText = null;

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
      if (!isValid) {
        helperText = 'This field is required';
      }
    }

    if (rules.minLength && isValid) {
      isValid = value.trim().length >= rules.minLength;
      if (!isValid) {
        helperText = `This field requires at least ${rules.minLength} characters`;
      }
    }

    if (rules.maxLength && isValid) {
      isValid = value.trim().length <= rules.maxLength;
      if (!isValid) {
        helperText = `This field requires no more than ${rules.minLength} characters`;
      }
    }
    return { isValid, helperText };
  };

  state = {
    orderForm: {
      firstName: this.createConfig('textfield', 'text', 'First Name'),
      lastName: this.createConfig('textfield', 'text', 'Last Name'),
      street: this.createConfig('textfield', 'text', 'Street'),
      postalCode: this.createConfig(
        'textfield',
        'text',
        'Postal Code',
        '',
        5,
        5
      ),
      country: this.createConfig('textfield', 'text', 'Country'),
      email: this.createConfig('textfield', 'email', 'E-mail'),
      delivery: this.createConfig('select', null, 'Delivery'),
    },
    isFormValid: false,
  };

  checkFormValidity = () => {
    const inputFields = Object.keys(this.state.orderForm);

    for (let i = 0; i < inputFields.length; i++) {
      if (!this.state.orderForm[inputFields[i]].valid) {
        return false;
      }
    }
    return true;
  };

  inputChangeHandler = (event, inputId) => {
    const newOrderForm = {
      ...this.state.orderForm,
    };
    const newFormElement = {
      ...newOrderForm[inputId],
    };
    newFormElement.value = event.target.value;
    const validityCheck = this.checkFieldValidity(
      newFormElement.value,
      newFormElement.validation
    );
    newFormElement.valid = validityCheck.isValid;
    newFormElement.errorMsg = validityCheck.helperText;

    newFormElement.touched = true;
    newOrderForm[inputId] = newFormElement;
    this.setState({ orderForm: newOrderForm });
    setTimeout(
      () => this.setState({ isFormValid: this.checkFormValidity() }),
      10
    );
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formEl in this.state.orderForm) {
      formData[formEl] = this.state.orderForm[formEl].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData: formData,
    };
    this.props.orderBurger(order);
  };

  render() {
    return (
      <Modal show={this.props.on} modalClosed={this.props.off}>
        <Box >
          <form>
            <Paper elevation={10} style={{ padding: '20px' }}>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-evenly'
                height='100%'
                alignItems='center'
              >
                {this.props.loading ? (
                  <ProgressCircle style={{width: '20vh', height: '20vh'}}/>
                ) : (
                  <Box display='flex' flexDirection='column' width={{xs: '100%', sm: '400px'}} alignItems='center'  p='20px'>
                    <Typography align='center' variant='h5'>
                      Enter your contact data
                    </Typography>
                    <Redirect to={this.props.match.path + '/1'} />
                    <Route
                      path={this.props.match.path + '/1'}
                      render={() => (
                        <React.Fragment>
                           <Box p='30px'>
                          {Object.keys(this.state.orderForm)
                            .slice(0, 4)
                            .map((formElement) => {
                              return (
                                <Input
                                value={this.state.orderForm[formElement].value}
                                  error={
                                    !this.state.orderForm[formElement].valid &&
                                    this.state.orderForm[formElement].touched
                                  }
                                  helperText={
                                    this.state.orderForm[formElement].errorMsg
                                  }
                                  changed={(event) =>
                                    this.inputChangeHandler(event, formElement)
                                  }
                                  key={formElement}
                                  {...this.state.orderForm[formElement]}
                                />
                              );
                            })}
                            </Box>
                            <Box
                            display='flex'
                            justifyContent='space-between'
                            width='80%'
                          >
                            <DataButton onClick={this.props.off} variant='contained' color='secondary'>
                              CLOSE
                            </DataButton>
                          <Link
                            to={this.props.match.path + '/2'}
                            style={{ textDecoration: 'none'}}
                            
                          >
                             
                            <DataButton variant='contained' color='secondary'>
                              NEXT
                            </DataButton>
                          </Link>
                          </Box>
                        </React.Fragment>
                      )}
                    />
                    <Route
                      path={this.props.match.path + '/2'}
                      render={() => (
                        <React.Fragment>
                          <Box p='30px'>
                            {Object.keys(this.state.orderForm)
                              .slice(4)
                              .map((formElement) => {
                                return (
                                  <Input
                                    error={
                                      !this.state.orderForm[formElement]
                                        .valid &&
                                      this.state.orderForm[formElement].touched
                                    }
                                    helperText={
                                      this.state.orderForm[formElement].errorMsg
                                    }
                                    changed={(event) =>
                                      this.inputChangeHandler(
                                        event,
                                        formElement
                                      )
                                    }
                                    key={formElement}
                                    {...this.state.orderForm[formElement]}
                                  />
                                );
                              })}
                          </Box>
                          <Box
                            display='flex'
                            justifyContent='space-between'
                            width='80%'
                          >
                            <Link
                              style={{ textDecoration: 'none' }}
                              to={this.props.match.path + '/1'}
                            >
                              <DataButton variant='contained' color='secondary'>
                                BACK
                              </DataButton>{' '}
                            </Link>

                            <DataButton
                              onClick={this.orderHandler}
                              variant='contained'
                              color='secondary'
                              disabled={!this.state.isFormValid}
                            >
                              ORDER
                            </DataButton>
                          </Box>
                        </React.Fragment>
                      )}
                    />
                  </Box>
                )}
              </Box>
            </Paper>
          </form>
        </Box>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  price: state.burgerBuilder.totalPrice,
  ingredients: state.burgerBuilder.ingredients,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  orderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
