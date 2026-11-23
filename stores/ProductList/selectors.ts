import { ProductList } from "@/types/product-list";
import { Retailer } from "../RetailerStore/store";
import { ProductListStore } from "./store";

export const selectLists = (state: ProductListStore) => state.lists;

export const selectSelectedListId = (state: ProductListStore) =>
  state.selectedListId;

export const selectSelectedList = (state: ProductListStore) =>
  state.lists.find((list) => list.id === state.selectedListId);

export const selectedListWithFilteredDiscounts = (
  selectedList: ProductList | undefined,
  retailers: Retailer[],
) => {
  if (selectedList === undefined) {
    return undefined;
  }

  return {
    ...selectedList,
    products: selectedList.products.map((product) => ({
      ...product,
      productDiscounts: product.productDiscounts.filter((discount) =>
        retailers.includes(discount.retailer),
      ),
    })),
  };
};
