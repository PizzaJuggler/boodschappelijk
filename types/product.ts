import { Identifiable } from "./identifiable";

export type Product = Identifiable & {
  quantity: number;
  unit: ProductUnit;
};

export type ProductUnit = "g" | "L" | "stuk";
