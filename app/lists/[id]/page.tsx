"use client";
import AddItem from "@/components/ui/add-item";
import { Card } from "@/components/ui/card";
import { selectSelectedList } from "@/stores/ProductList/selectors";
import { useProductListStore } from "@/stores/ProductList/store";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function listWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <List />
    </Suspense>
  );
}

function List() {
  const [productName, setProductName] = useState("");
  const { id } = useParams();

  const { addProduct, selectList } = useProductListStore();

  useEffect(() => {
    if (typeof id === "string") {
      selectList(id);
    }
  }, [id]);
  const list = useProductListStore(selectSelectedList);

  return (
    <div>
      <h1 className="font-bold text-2xl">{list?.name}</h1>
      <AddItem
        title="Voeg product toe+"
        item={productName}
        onChange={(e) => {
          setProductName(e.target.value);
        }}
        onSubmit={() => {
          console.log(list);
          if (list?.id) {
            addProduct(list.id, { id: crypto.randomUUID(), name: productName });
          }

          setProductName("");
        }}
      />
      {list?.products.map((product) => (
        <Card key={product.id}>{product.name}</Card>
      ))}
    </div>
  );
}
