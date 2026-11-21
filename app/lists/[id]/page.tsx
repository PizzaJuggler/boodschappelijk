"use client";
import AddItem from "@/components/ui/add-item";
import { Card } from "@/components/ui/card";
import useProductLists from "@/hooks/use-product-lists";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function listWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <List />
    </Suspense>
  );
}

function List() {
  const [productName, setProductName] = useState("");
  const params = useParams();
  const { lists, addProduct } = useProductLists();

  const list = lists.find((list) => list.id === params.id);

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
          addProduct(productName, list?.id);
          setProductName("");
        }}
      />
      {list?.products.map((product) => (
        <Card key={product.id}>{product.name}</Card>
      ))}
    </div>
  );
}
