import React from 'react';

import { Route, Link, withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import Input from '../../../../components/UI/Input/Input';
import PaperButton from '../../../../components/UI/PaperButton/PaperButton';

const Form = (props) => {
  const chunkifiedForm = [];
  const len = Object.keys(props.form).length;
  let i = 0;
  let n = props.pageNumber;
  let size;

  while (i < len) {
    size = Math.ceil((len - i) / n--);
    chunkifiedForm.push(Object.keys(props.form).slice(i, (i += size)));
  }
  return (
    <React.Fragment>
      {chunkifiedForm.map((page, index) => {
        return (
          <Route
            key={index}
            path={props.match.path + `/${index + 1}`}
            render={() => (
              <React.Fragment>
                <Box p='30px'>
                  {page.map((formElement) => {
                    return (
                      <Input
                        value={props.form[formElement].value}
                        error={
                          !props.form[formElement].valid &&
                          props.form[formElement].touched
                        }
                        helperText={props.form[formElement].errorMsg}
                        changed={(event) =>
                          props.inputChangeHandler(event, formElement)
                        }
                        key={formElement}
                        {...props.form[formElement]}
                      />
                    );
                  })}
                </Box>
                <Box display='flex' justifyContent='space-between' width='80%'>
                  <PaperButton
                    onClick={() =>
                      index === 0
                        ? props.history.push('/checkout')
                        : props.history.goBack()
                    }
                    variant='contained'
                    color='secondary'
                  >
                    BACK
                  </PaperButton>
                  {index + 1 < props.pageNumber ? (
                    <Link
                      to={props.match.path + `/${index + 2}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <PaperButton variant='contained' color='primary'>
                        NEXT
                      </PaperButton>
                    </Link>
                  ) : (
                    <PaperButton
                      onClick={props.orderHandler}
                      variant='contained'
                      color='primary'
                      disabled={!props.isFormValid}
                    >
                      ORDER
                    </PaperButton>
                  )}
                </Box>
              </React.Fragment>
            )}
          />
        );
      })}
    </React.Fragment>
  );
};

export default withRouter(Form);
