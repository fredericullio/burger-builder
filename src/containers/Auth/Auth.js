import React, { Component } from 'react';

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
      password: formUtils.createConfig('textfield', 'password', 'Password', '', 6),
    },
    isFormValid: false
  };

  inputChangeHandler = (event, inputId) => {
    const newOrderForm = {
      ...this.state.authForm,
    };
    const newFormElement = {
      ...newOrderForm[inputId],
    };
    newFormElement.value = event.target.value;
    const validityCheck = formUtils.checkFieldValidity(
      newFormElement.value,
      newFormElement.validation
    );
    newFormElement.valid = validityCheck.isValid;
    newFormElement.errorMsg = validityCheck.helperText;

    newFormElement.touched = true;
    newOrderForm[inputId] = newFormElement;
    this.setState({ authForm: newOrderForm });
    setTimeout(
      () => this.setState({ isFormValid: formUtils.checkFormValidity(this.state.authForm) }),
      10
    );
  };

  render() {
    return (
      <Box  display='flex' flexDirection='column' alignItems='center' justifyContent='center' pt='100px' mx='auto' width='100%' textAlign='center'>
          <Paper elevation={5} style={{padding: '50px'}}>

        <Typography variant='h3'>SIGN IN</Typography>
        <Box p='30px'>
            
          {Object.keys(this.state.authForm).map((formElement) => {
            return (
              <Input
                value={this.state.authForm[formElement].value}
                error={
                  !this.state.authForm[formElement].valid &&
                  this.state.authForm[formElement].touched
                }
                helperText={this.state.authForm[formElement].errorMsg}
                changed={(event) => this.inputChangeHandler(event, formElement)}
                key={formElement}
                {...this.state.authForm[formElement]}
              />
            );
          })}
        </Box>
        <Box display='flex' justifyContent='center'>
          <DataButton
            variant='contained'
            color='primary'
            disabled={!this.state.isFormValid}
          >
            ACCEPT
          </DataButton>
        </Box>
        </Paper>

      </Box>
    );
  }
}

export default Auth;
