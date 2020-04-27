import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

const Order = (props) => {
  const ingredients = [];

  for (const ing in props.ingredients) {
    if (props.ingredients[ing] > 0) {
      ingredients.push({ name: ing, amount: props.ingredients[ing] });
    }
  }

  const ingredientDisplay = ingredients.map((ing) => (
    <Box boxShadow={5} mx={2} p={1}>
      {ing.name} [{ing.amount}]
    </Box>
  ));

  return (
    <ListItem>
      <Box
        width="100%"
        border="1px solid #eee"
        p="10px"
        m="10px auto"
        boxSizing="border-box"
        boxShadow={4}
        textAlign="center"
      >
        <Box component="span" fontWeight="bold">
          {`Ingredients: `}
        </Box>
        <Box display="flex" direction="row" justifyContent="center" mt="20px">
          {ingredientDisplay}
        </Box>
        <Typography>
          <br />
          Price:
          <Box component="span" fontWeight="bold">
            {` $${props.price.toFixed(2)}`}
          </Box>
        </Typography>
      </Box>
    </ListItem>
  );
};

export default Order;
