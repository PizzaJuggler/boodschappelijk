import { Empty } from "./empty";
import { ProductUnit } from "./product";

export type RetailProduct = {
  id: string;
  imgSrc: string;
  name: string;
  quantity: string;
  unit: ProductUnit | Empty;
  unitPrice: number | Empty;
  savingsAmount: number | Empty;
  validFrom: string | Empty;
  validUntil: string | Empty;
  multiBuyQuantity: number | Empty;
  multiBuyPrice: number | Empty;
};
