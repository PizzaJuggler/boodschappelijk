"use client";
import AddItem from "@/components/ui/add-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { selectSelectedList } from "@/stores/ProductList/selectors";
import { useProductListStore } from "@/stores/ProductList/store";
import { Trash } from "lucide-react";
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

  const { addProduct, removeProduct, selectList, adjustProductQuantity } =
    useProductListStore();

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
            addProduct({
              id: crypto.randomUUID(),
              name: productName,
              quantity: 1,
            });
          }

          setProductName("");
        }}
      />
      <div className="flex flex-col gap-4 mt-4">
        {list?.products.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex items-center">
              <span>{product.name}</span>

              <div className="flex gap-2">
                <Button
                  className="rounded-full aspect-square"
                  onClick={() => adjustProductQuantity(product.id, -1)}
                >
                  -
                </Button>
                <Input
                  type="number"
                  className="w-12"
                  value={product.quantity}
                ></Input>
                <Button
                  className="rounded-full aspect-square"
                  onClick={() => adjustProductQuantity(product.id, 1)}
                >
                  +
                </Button>
              </div>

              <Button onClick={() => removeProduct(list.id, product.id)}>
                <Trash />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
