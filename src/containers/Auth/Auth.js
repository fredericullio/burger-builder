import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import {Redirect} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Input from '../../components/UI/Input/Input';
import * as formUtils from '../../util/formUtils';
import { Typography, Paper } from '@material-ui/core';

const DataButton = withStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    fontSize: 16,
  },
}))(Button);

class Auth extends Component {
  state = {
    authForm: {
      email: formUtils.createConfig('textfield', 'email', 'E-mail', ''),
      password: formUtils.createConfig(
        'textfield',
        'password',
        'Password',
        '',
        6
      ),
    },
    isFormValid: false,
    isSignIn: false,
  };

  inputChangeHandler = (event, inputId) => {
    const validityCheck = formUtils.checkFieldValidity(
      event.target.value,
      this.state.authForm[inputId].validation
    );
    this.setState({
      authForm: {
        ...this.state.authForm,
        [inputId]: {
          ...this.state.authForm[inputId],
          value: event.target.value,
          valid: validityCheck.isValid,
          errorMsg: validityCheck.helperText,
          touched: true,
        },
      },
    });
    setTimeout(
      () =>
        this.setState({
          isFormValid: formUtils.checkFormValidity(this.state.authForm),
        }),
      10
    );
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.auth(
      this.state.authForm.email.value,
      this.state.authForm.password.value,
      this.state.isSignIn
    );
  };

  switchSignInSignUp = () => {
    this.setState({ isSignIn: !this.state.isSignIn });
  };

  render() {
    return (
      <React.Fragment>
      {this.props.isAuthenticated && (this.props.purchasable ? <Redirect to='/checkout' /> : <Redirect to='/' />)}
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        pt='100px'
        mx='auto'
        width='100%'
        textAlign='center'
      >
        <Paper elevation={5} style={{ padding: '50px 25px 0 25px' }}>
          <Typography variant='h3'>
            {`SIGN ${this.state.isSignIn ? 'IN' : 'UP'}`}
          </Typography>
          <Box p='30px'>
            {Object.keys(this.state.authForm).map((formElement) => {
              return (
                <Input
                  disabled={this.props.loading}
                  value={this.state.authForm[formElement].value}
                  error={
                    !this.state.authForm[formElement].valid &&
                    this.state.authForm[formElement].touched
                  }
                  helperText={this.state.authForm[formElement].errorMsg}
                  changed={(event) =>
                    this.inputChangeHandler(event, formElement)
                  }
                  key={formElement}
                  {...this.state.authForm[formElement]}
                />
              );
            })}
            {this.props.error && <Typography style={{color: 'red'}}> {this.props.error.message} </Typography>}
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='space-evenly'
            height='150px'
          >
            <DataButton
              onClick={this.submitHandler}
              variant='contained'
              color='primary'
              disabled={!this.state.isFormValid || this.props.loading}
            >
              {this.props.loading ? 'CONNECTING...' : 'ACCEPT'}
            </DataButton>
            <DataButton
              onClick={this.switchSignInSignUp}
              color='secondary'
              disableRipple
              disabled={this.props.loading}
            >
              {`SWITCH TO SIGN ${this.state.isSignIn ? 'UP' : 'IN'}`}
            </DataButton>
          </Box>
        </Paper>
      </Box>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  purchasable: state.burgerBuilder.purchasable,
});

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isSignIn) =>
    dispatch(actions.auth(email, password, isSignIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
