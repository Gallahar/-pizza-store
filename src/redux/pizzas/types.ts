export type TPizzas = {
  rating: number;
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  description: string;
};

export interface IPizzasSliceState {
  pizzas: TPizzas[];
  status: EStatus;
}

export enum EStatus {
  LOADING = "loading",
  FULFILLED = "fulfilled",
  ERROR = "error",
}
