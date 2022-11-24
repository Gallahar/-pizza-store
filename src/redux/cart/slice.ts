import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartSliceState, TCartPizza } from "./types";
import { getCartLSData } from "../../utils/getCartLSData";
import { getTotalPriceLS } from "../../utils/getTotalPriceLS";

const initialState: ICartSliceState = {
  totalPrice: getTotalPriceLS(),
  pizzas: getCartLSData(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<TCartPizza>) => {
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
    removePizza: (state, action: PayloadAction<TCartPizza>) => {
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
    removePizzaCount: (state, action: PayloadAction<TCartPizza>) => {
      const findPizza = state.pizzas.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findPizza && findPizza.count > 1) {
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
