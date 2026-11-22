"use client";
import AddProduct from "@/components/ui/add-item";
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
import { ProductUnit } from "@/types/product";
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
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<ProductUnit>("stuk");
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
      <AddProduct
        title="Voeg product toe+"
        name={productName}
        quantity={quantity}
        unit={unit}
        onProductNameChange={(e) => {
          setProductName(e.target.value);
        }}
        onQuantityChange={(e) => setQuantity(+e.target.value)}
        onUnitChange={(newUnit) => {
          if (!!newUnit) {
            setUnit(newUnit);
          }
        }}
        onSubmit={() => {
          if (list?.id) {
            addProduct({
              id: crypto.randomUUID(),
              name: productName,
              quantity,
              unit,
            });
          }

          setProductName("");
          setQuantity(1);
          setUnit("stuk");
        }}
      />
      <div className="flex flex-col gap-4 mt-4">
        {list?.products.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex items-center justify-between">
              <span>{product.name}</span>

              <span>
                {product.quantity} {product.unit}
              </span>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => removeProduct(product.id)}
                >
                  <Trash />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
