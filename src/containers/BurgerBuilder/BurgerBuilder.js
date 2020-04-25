import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Box from "@material-ui/core/Box";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6,
  tomato: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-13728.firebaseio.com/Ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
        this.updatePurchaseState(this.state.ingredients);
      })
      .catch(() => this.setState({ error: true }));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    const updatedCount = prevCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const prevCount = this.state.ingredients[type];
    if (prevCount === 0) {
      return;
    }
    const updatedCount = prevCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const prevPrice = this.state.totalPrice;
    const newPrice = prevPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Maciej Kuchta",
        address: "some address",
        country: "Poland",
        email: "some@mailbox.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then(() => this.setState({ loading: false, purchasing: false }))
      .catch(() => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    const disabledInfoKeys = Object.keys(disabledInfo);
    for (let i = 0; i < disabledInfoKeys.length; i++) {
      disabledInfo[disabledInfoKeys[i]] =
        disabledInfo[disabledInfoKeys[i]] === 0;
    }

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    let orderSummary = <Spinner />;
    if (this.state.ingredients) {
      burger = <Burger ingredients={this.state.ingredients} />;
      if (!this.state.loading) {
        orderSummary = (
          <OrderSummary
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        );
      }
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Box
          height="calc(100vh - 72px)"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          overflow="hidden"
        >
          {burger}
          <BuildControls
            ingredientRemoved={this.removeIngredientHandler}
            ingredientAdded={this.addIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Box>
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
