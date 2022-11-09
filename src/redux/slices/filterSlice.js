import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pagination: 1,
  categoryIndex: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
  search: "",
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
      state.search = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setParams: (state, action) => {
      state.sort = action.payload.sort;
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.pagination = Number(action.payload.selectedPage);
    },
  },
});

export const {
  setCategoryIndex,
  setFilterOrder,
  setSearch,
  setPagination,
  setParams,
} = filterSlice.actions;
export default filterSlice.reducer;
