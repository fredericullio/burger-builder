import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import { Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import RotatingLogo from '../../components/UI/RotatingLogo/RotatingLogo';
import PaperButton from '../../components/UI/PaperButton/PaperButton';
import Input from '../../components/UI/Input/Input';
import * as formUtils from '../../util/formUtils';
import { Typography, Paper } from '@material-ui/core';

const styles = (theme) => ({
  '@keyframes trans': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359deg)',
    },
  },
  '@keyframes bump': {
    '0%': {
      transform: 'scale(1,1)',
    },
    '50%': {
      transform: 'scale(0,0)',
    },
    '100%': {
      transform: 'scale(1,1)',
    },
  },
  textBump: {
    animation: '$bump 0.3s ease-out',
  },
  root: {
    animation: '$trans 0.3s ease-in-out',
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.9)',
    },
    padding: '50px 25px 25px 25px'
  },
});

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
    addAnimation: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSignIn !== this.state.isSignIn) {
      this.setState({ addAnimation: true });
      setTimeout(() => this.setState({ addAnimation: false }), 300);
    }
  }

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
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.props.isAuthenticated &&
          (this.props.purchasable ? (
            <Redirect to='/checkout' />
          ) : (
            <Redirect to='/' />
          ))}
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          width='100%'
          height='calc(100vh - 70px)'
          textAlign='center'
        >
          <Paper
            elevation={5}
            className={classes.paper}
          >
            <RotatingLogo />
            <Typography
              className={this.state.addAnimation ? classes.root : null}
              variant='h3'
            >
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
              {this.props.error && (
                <Typography style={{ color: 'red' }}>
                  {' '}
                  {this.props.error.message}{' '}
                </Typography>
              )}
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='space-between'
              height='120px'
            >
              <PaperButton
                onClick={this.submitHandler}
                variant='contained'
                color='primary'
                disabled={!this.state.isFormValid || this.props.loading}
              >
                {this.props.loading ? 'CONNECTING...' : 'ACCEPT'}
              </PaperButton>
              <Box >
                <Typography
                  className={this.state.addAnimation ? classes.textBump : null}
                  color='secondary'
                >
                  {this.state.isSignIn
                    ? "Don't have an account?"
                    : 'Have an account already?'}
                </Typography>
                <PaperButton
                  onClick={this.switchSignInSignUp}
                  color='secondary'
                  disableRipple
                  disabled={this.props.loading}
                >
                    SWITCH TO SIGN
                    <Box
                      component='span'
                      display='inline-block'
                      ml='5px'
                      className={
                        this.state.addAnimation ? classes.textBump : null
                      }
                    >
                      {this.state.isSignIn ? 'UP' : 'IN'}
                    </Box>
                </PaperButton>
              </Box>
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
  ingredients: state.burgerBuilder.ingredients,
});

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isSignIn) =>
    dispatch(actions.auth(email, password, isSignIn)),
});

export default 
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Auth)
);
