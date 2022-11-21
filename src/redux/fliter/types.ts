export type TSort = {
  name: "популярности" | "цене" | "алфавиту";
  sort: "rating" | "price" | "title";
};

export interface IFilterSliceState {
  pagination: number;
  categoryIndex: number;
  sort: TSort;
  searchInput: string;
  order: boolean | string;
}
