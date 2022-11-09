import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  pizzas: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const findPizza = state.pizzas.find(
        (obj) => obj.id === action.payload.id
      );
      if (findPizza) {
        findPizza.count++;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.pizzas.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
    removePizza: (state, action) => {
      state.pizzas = state.pizzas.filter((obj) => obj.id !== action.payload);
    },
    clearPizza: (state) => {
      state.pizzas = [];
      state.totalPrice = 0;
    },
  },
});

export const { addPizza, removePizza, clearPizza, countPizzas } =
  cartSlice.actions;
export default cartSlice.reducer;
