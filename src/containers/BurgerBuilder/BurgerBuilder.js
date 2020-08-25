import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ProgressCircle from '../../components/UI/ProgressCircle/ProgressCircle';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

import Box from '@material-ui/core/Box';

class BurgerBuilder extends Component {
  componentDidMount() {
    if (!this.props.ingredients) {
      this.props.initIngredients();
    }
  }

  componentWillUnmount() {
    if (this.props.purchasing) {
      this.props.purchaseOff();
    }
  }


  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    const disabledInfoKeys = Object.keys(disabledInfo);
    for (let i = 0; i < disabledInfoKeys.length; i++) {
      disabledInfo[disabledInfoKeys[i]] =
        disabledInfo[disabledInfoKeys[i]] === 0;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.props.purchasing}
          modalClosed={this.props.purchaseOff}
        >
          {this.props.ingredients ? (
            <OrderSummary purchaseContinued={this.purchaseContinueHandler} />
          ) : (
            <ProgressCircle />
          )}
        </Modal>
        <Box
          height='calc(100vh - 72px)'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          alignItems='center'
        >
          {this.props.error ? (
            <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
          ) : (
            <Box
              width='100%'
              height='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              overflow='auto'
            >
              {this.props.ingredients ? (
                <Burger />
              ) : (
                <ProgressCircle style={{ width: '30vh', height: '30vh' }} />
              )}
            </Box>
          )}
          <BuildControls ordered={this.purchaseHandler} />
        </Box>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    purchasing: state.purchase.purchasing,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initIngredients: () => dispatch(actions.initIngredients()),
    purchaseOff: () => dispatch(actions.purchaseOff()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
