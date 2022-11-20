import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStore } from "../store";

export type TSort = {
  name: "популярности" | "цене" | "алфавиту";
  sort: "rating" | "price" | "title";
};

export interface IFilterSliceState {
  pagination: number;
  categoryIndex: number;
  sort: TSort;
  searchInput: string;
  order: boolean;
}

const initialState: IFilterSliceState = {
  pagination: 1,
  categoryIndex: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
  searchInput: "",
  order: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryIndex: (state, action: PayloadAction<number>) => {
      state.categoryIndex = action.payload;
    },
    setFilterOrder: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setPagination: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload;
    },
    setParams: (state, action: PayloadAction<IFilterSliceState>) => {
      state.sort = action.payload.sort;
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.pagination = Number(action.payload.pagination);
    },
    setOrder: (state, action: PayloadAction<boolean>) => {
      state.order = action.payload;
    },
  },
});

export const selectFilter = (state: RootStore) => state.sorting;

export const {
  setCategoryIndex,
  setFilterOrder,
  setSearch,
  setPagination,
  setParams,
  setOrder,
} = filterSlice.actions;
export default filterSlice.reducer;
