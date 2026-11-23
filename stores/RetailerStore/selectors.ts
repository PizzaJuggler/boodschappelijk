import { RetailerStore, useRetailerStore } from "./store";

export const selectedRetailers = (state: RetailerStore) =>
  state.selectedRetailers;
