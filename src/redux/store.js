import { configureStore } from "@reduxjs/toolkit";
import sorting from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    sorting,
    cart,
    pizzas,
  },
});
