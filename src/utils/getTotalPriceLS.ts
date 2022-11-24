import { TCartPizza } from "../redux/cart/types";

type TGetTotalPriceLS = () => number;

export const getTotalPriceLS: TGetTotalPriceLS = () => {
  const data = localStorage.getItem("cartPizzas");
  return data
    ? JSON.parse(data).reduce(
        (sum: number, obj: TCartPizza) => sum + obj.count * obj.price,
        0
      )
    : 0;
};
