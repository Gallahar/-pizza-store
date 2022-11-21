import { RootStore } from "../store";

export const selectFilter = (state: RootStore) => state.sorting;
