import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStore } from "../store";
import { IFilterSliceState } from "./filterSlice";

export const fetchPizzasById = createAsyncThunk<TPizzas[], IFilterSliceState>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, pagination, sort, searchInput, categoryIndex } = params;
    const searching = searchInput ? `&search=${searchInput}` : "";
    const { data } = await axios.get<TPizzas[]>(
      order
        ? `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?p=${pagination}&l=4&${
            categoryIndex ? `category=${categoryIndex}&` : ""
          }sortBy=${sort.sort}${searching}`
        : `https://63514f09dfe45bbd55bca49f.mockapi.io/pizzas?p=${pagination}&l=4&${
            categoryIndex ? `category=${categoryIndex}&` : ""
          }sortBy=${sort.sort}&order=desc${searching}`
    );
    return data;
  }
);

type TPizzas = {
  rating: number;
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  description: string;
};

interface IPizzasSliceState {
  pizzas: TPizzas[];
  status: Status;
}

export enum Status {
  LOADING = "loading",
  FULFILLED = "fulfilled",
  ERROR = "error",
}

const initialState: IPizzasSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<TPizzas[]>) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasById.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzasById.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.FULFILLED;
    });
    builder.addCase(fetchPizzasById.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.pizzas = [];
      console.log(action.payload);
    });
  },
});

export const selectPizzaDataStatus = (state: RootStore) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
