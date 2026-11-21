import { ProductList } from "@/types/product-list";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export type ProductListStore = {
  lists: ProductList[];
  selectedListId: string | undefined;

  selectList: (id: string) => void;

  addList: (name: string) => void;
  removeList: (id: string) => void;
  renameList: (id: string, name: string) => void;

  addProduct: (listId: string, product: Product) => void;
  removeProduct: (listId: string, productId: string) => void;
};

export const useProductListStore = create<ProductListStore>()(
  persist(
    (set) => ({
      lists: [],
      selectedListId: undefined,

      selectList: (id) =>
        set(() => ({
          selectedListId: id,
        })),

      addList: (name) =>
        set((state) => ({
          lists: [
            ...state.lists,
            {
              id: crypto.randomUUID(),
              name,
              products: [],
            },
          ],
        })),

      removeList: (id) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        })),

      renameList: (id, name) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, name } : list,
          ),
        })),

      addProduct: (listId, product) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, products: [...list.products, product] }
              : list,
          ),
        })),

      removeProduct: (listId, productId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  products: list.products.filter(
                    (product) => product.id !== productId,
                  ),
                }
              : list,
          ),
        })),
    }),
    {
      name: "product-lists",
    },
  ),
);
