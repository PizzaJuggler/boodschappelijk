import { ProductList } from "@/types/product-list";
import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductListStore = {
  lists: ProductList[];
  selectedListId: string | undefined;

  selectList: (id: string) => void;

  addList: (name: string) => void;
  removeList: (id: string) => void;
  renameList: (id: string, name: string) => void;

  addProduct: (product: Product) => void;
  adjustProductQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
};

const updateSelectedList = (
  state: ProductListStore,
  updater: (list: ProductList) => ProductList,
) => ({
  lists: state.lists.map((list) =>
    list.id === state.selectedListId ? updater(list) : list,
  ),
});

const updateSelectedListProducts = (
  state: ProductListStore,
  updater: (products: Product[]) => Product[],
) =>
  updateSelectedList(state, (list) => ({
    ...list,
    products: updater(list.products),
  }));

const updateProductQuantity = (
  products: Product[],
  productId: string,
  quantity: number,
): Product[] =>
  products.map((product) =>
    product.id === productId
      ? { ...product, quantity: product.quantity + quantity }
      : product,
  );

const removeProductFromList = (
  products: Product[],
  productId: string,
): Product[] => products.filter((product) => product.id !== productId);

export const useProductListStore = create<ProductListStore>()(
  persist(
    (set) => ({
      lists: [],
      selectedListId: undefined,

      selectList: (id) => set({ selectedListId: id }),

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
          selectedListId:
            state.selectedListId === id ? undefined : state.selectedListId,
        })),

      renameList: (id, name) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, name } : list,
          ),
        })),

      addProduct: (product) =>
        set((state) =>
          updateSelectedListProducts(state, (products) => [
            ...products,
            product,
          ]),
        ),

      adjustProductQuantity: (productId, quantity) =>
        set((state) =>
          updateSelectedListProducts(state, (products) =>
            updateProductQuantity(products, productId, quantity),
          ),
        ),

      removeProduct: (productId) =>
        set((state) =>
          updateSelectedListProducts(state, (products) =>
            removeProductFromList(products, productId),
          ),
        ),
    }),
    {
      name: "product-lists",
    },
  ),
);
