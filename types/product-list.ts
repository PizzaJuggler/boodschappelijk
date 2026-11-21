import { Identifiable } from "./identifiable";

export type ProductList = Identifiable & {
  products: Identifiable[];
};
