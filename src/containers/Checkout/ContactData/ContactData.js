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
import { createConfig, checkFormValidity, checkFieldValidity } from '../../../util/formUtils';

const DataButton = withStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    fontSize: 16,
  },
}))(Button);

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
      country: createConfig('textfield', 'text', 'Country', ''),
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
    this.setState({ orderForm: newOrderForm });
    setTimeout(
      () => this.setState({ isFormValid: checkFormValidity(this.state.orderForm) }),
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
                             
                            <DataButton variant='contained' color='primary'>
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
