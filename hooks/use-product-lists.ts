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
    setListsCache(lists.filter((list) => list.id === id));
  };

  return { addList, removeList, lists: mounted ? lists : [] };
}
