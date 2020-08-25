import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Paper from '@material-ui/core/Paper';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => this.setState({ error: error })
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => this.setState({ error: null });
    render() {
      return (
        <React.Fragment>
          <Modal
            show={Boolean(this.state.error)}
            modalClosed={this.errorConfirmedHandler}
          >
            <Paper style={{padding: '50px'}}>{this.state.error ? this.state.error.message : null}</Paper>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
