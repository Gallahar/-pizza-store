import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterSliceState, TSort } from "./types";

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
      state.order = action.payload.order;
      state.searchInput = action.payload.searchInput;
    },
    setOrder: (state, action: PayloadAction<boolean>) => {
      state.order = action.payload;
    },
  },
});

export const {
  setCategoryIndex,
  setFilterOrder,
  setSearch,
  setPagination,
  setParams,
  setOrder,
} = filterSlice.actions;
export default filterSlice.reducer;
