import { RootStore } from "../store";

export const selectCartPizzas = (state: RootStore) => state.cart.pizzas;
export const selectCartTotalPrice = (state: RootStore) => state.cart.totalPrice;
