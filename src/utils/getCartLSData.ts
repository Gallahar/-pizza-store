import { TCartPizza } from "../redux/cart/types";

type TGetCartLSData = () => TCartPizza[] | [];

export const getCartLSData: TGetCartLSData = () => {
  const data = localStorage.getItem("cartPizzas");
  return data ? JSON.parse(data) : [];
};
