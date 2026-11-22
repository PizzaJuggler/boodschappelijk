"use client";

import AddProduct from "@/components/ui/add-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProductListStore } from "@/stores/ProductList/store";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [listName, setListName] = useState("");
  const { lists, addList, removeList } = useProductListStore();

  return (
    <>
      <h1 className="font-bold text-2xl">Lijsten</h1>
      <AddProduct
        title="Voeg lijst toe+"
        item={listName}
        onProductNameChange={(e) => {
          setListName(e.target.value);
        }}
        onSubmit={() => {
          addList(listName);
        }}
      />
      {lists.map((list) => (
        <Link key={list.id} href={`/lists/${list.id}`}>
          <Card className="hover:shadow-md px-4 transition-shadow cursor-pointer flex flex-col">
            <CardContent className="flex justify-between items-center">
              <div>{list.name}</div>
              <Button onClick={() => removeList(list.id)}>
                <Trash />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
