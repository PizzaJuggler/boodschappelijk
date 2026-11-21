import { Identifiable } from "./identifiable";
import { Product } from "./product";

export type ProductList = Identifiable & {
  products: Product[];
};
