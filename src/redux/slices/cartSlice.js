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
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
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
      const findPizza = state.pizzas.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findPizza) {
        state.pizzas = state.pizzas.filter(
          (obj) =>
            obj.id !== action.payload.id ||
            obj.type !== action.payload.type ||
            obj.size !== action.payload.size
        );
        state.totalPrice = state.pizzas.reduce(
          (sum, obj) => sum + obj.price * obj.count,
          0
        );
      }
    },
    clearPizza: (state) => {
      state.pizzas = [];
      state.totalPrice = 0;
    },
    removePizzaCount: (state, action) => {
      const findPizza = state.pizzas.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findPizza.count > 1) {
        findPizza.count--;
      }
      state.totalPrice = state.pizzas.reduce(
        (sum, obj) => sum + obj.price * obj.count,
        0
      );
    },
  },
});

export const { addPizza, removePizza, clearPizza, removePizzaCount } =
  cartSlice.actions;
export default cartSlice.reducer;
