import { Empty } from "./empty";
import { Identifiable } from "./identifiable";
import { RetailProduct } from "./retail-product";

export type Product = Identifiable & {
  quantity: number;
  unit: ProductUnit;
  productDiscounts: RetailProduct[];
};

const PRODUCT_UNITS = {
  l: "L",
  kg: "kg",
  stuk: "stuk",
} as const;

export type ProductUnit = (typeof PRODUCT_UNITS)[keyof typeof PRODUCT_UNITS];

export function mapProductUnit(unit: string | Empty): ProductUnit | undefined {
  if (unit == null) {
    return undefined;
  }

  return PRODUCT_UNITS[unit.trim().toLowerCase() as keyof typeof PRODUCT_UNITS];
}
