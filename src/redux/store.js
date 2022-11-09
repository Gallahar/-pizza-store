import { configureStore } from "@reduxjs/toolkit";
import sorting from "./slices/filterSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    sorting,
    cart,
  },
});
