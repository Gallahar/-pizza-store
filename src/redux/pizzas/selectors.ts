import { RootStore } from "../store";

export const selectPizzaDataStatus = (state: RootStore) => state.pizzas;
