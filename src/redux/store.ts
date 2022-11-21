import { configureStore } from "@reduxjs/toolkit";
import sorting from "./fliter/slice";
import cart from "./cart/slice";
import pizzas from "./pizzas/slice";
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
