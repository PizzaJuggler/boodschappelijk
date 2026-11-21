"use client";

import AddItem from "@/components/ui/add-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useProductLists from "@/hooks/use-product-lists";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [listName, setListName] = useState("");
  const { lists, addList, removeList } = useProductLists();

  return (
    <>
      <h1 className="font-bold text-2xl">Lijsten</h1>
      <AddItem
        title="Voeg lijst toe+"
        item={listName}
        onChange={(e) => {
          setListName(e.target.value);
        }}
        onSubmit={() => {
          addList({
            id: crypto.randomUUID(),
            name: listName,
            products: [],
          });
        }}
      />
      {lists.map((list) => (
        <Link key={list.id} href={`/lists/${list.id}`}>
          <Card className="hover:shadow-md px-4 transition-shadow cursor-pointer flex flex-col">
            <CardContent className="flex justify-between">
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
