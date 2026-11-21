import { ProductListStore } from "./store";

export const selectLists = (state: ProductListStore) => state.lists;

export const selectSelectedListId = (state: ProductListStore) =>
  state.selectedListId;

export const selectSelectedList = (state: ProductListStore) =>
  state.lists.find((list) => list.id === state.selectedListId);
