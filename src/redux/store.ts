import { configureStore } from "@reduxjs/toolkit";
import sorting from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    sorting,
    cart,
    pizzas,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootStore = ReturnType<typeof store.getState>;
export default store;
