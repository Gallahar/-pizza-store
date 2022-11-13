import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzasById = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, selectedPage, filterOrder, searchInput, categoryIndex } =
      params;
    const searching = searchInput ? `&search=${searchInput}` : "";
    const { data } = await axios.get(
      order
        ? `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?p=${selectedPage}&l=4&${
            categoryIndex ? `category=${categoryIndex}&` : ""
          }sortBy=${filterOrder.sort}${searching}`
        : `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?p=${selectedPage}&l=4&${
            categoryIndex ? `category=${categoryIndex}&` : ""
          }sortBy=${filterOrder.sort}&order=desc${searching}`
    );
    return data;
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzasById.pending]: (state) => {
      state.status = "loading";
      state.pizzas = [];
    },
    [fetchPizzasById.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = "fulfilled";
    },
    [fetchPizzasById.rejected]: (state, action) => {
      state.status = "error";
      state.pizzas = [];
      console.log(action.payload);
    },
  },
});

export const selectPizzaDataStatus = (state) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
