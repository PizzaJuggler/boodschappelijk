import { ProductList } from "@/types/product-list";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export default function useProductLists() {
  const [listsCache, setListsCache] =
    useLocalStorage<ProductList[]>("product-lists");
  const [mounted, setMounted] = useState(false);

  const lists = listsCache ?? [];

  useEffect(() => {
    setMounted(true);
  }, []);

  const addList = (list: ProductList) => {
    if (!list.id.trim() || !list.name.trim()) {
      return;
    }

    setListsCache([...lists, list]);
  };

  const removeList = (id: string) => {
    setListsCache(lists.filter((list) => list.id !== id));
  };

  const addProduct = (productName: string, listId?: string) => {
    if (!listId) {
      return;
    }

    const list = lists.find((list) => list.id === listId);

    if (list === undefined) {
      return;
    }

    const newList: ProductList = {
      ...list,
      products: [
        ...list?.products,
        { id: crypto.randomUUID(), name: productName },
      ],
    };

    setListsCache([...lists.filter((list) => list.id !== listId), newList]);
  };

  const removeProduct = (productId: string, listId?: string) => {
    if (!listId) {
      return;
    }

    const list = lists.find((list) => list.id === listId);

    if (list === undefined) {
      return;
    }

    const newList: ProductList = {
      ...list,
      products: [
        ...list?.products.filter((product) => product.id !== productId),
      ],
    };

    setListsCache([...lists.filter((list) => list.id !== listId), newList]);
  };

  return { addList, removeList, lists: mounted ? lists : [], addProduct };
}
