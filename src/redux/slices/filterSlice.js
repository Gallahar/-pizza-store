import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
    },
    setFilterOrder: (state, action) => {
      state.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.searchInput = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setParams: (state, action) => {
      state.sort = action.payload.sort;
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.pagination = Number(action.payload.pagination);
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const selectFilter = (state) => state.sorting;

export const {
  setCategoryIndex,
  setFilterOrder,
  setSearch,
  setPagination,
  setParams,
  setOrder,
} = filterSlice.actions;
export default filterSlice.reducer;
