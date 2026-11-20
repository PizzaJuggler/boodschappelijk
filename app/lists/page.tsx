"use client";

import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import useProductLists from "@/hooks/use-product-lists";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [listName, setListName] = useState("");
  const { lists, addList } = useProductLists();

  return (
    <div className="flex flex-col bg-background px-4 py-4 gap-4">
      <h1 className="font-bold text-2xl">Lijsten</h1>
      <form
        onSubmit={() => {
          addList({
            id: crypto.randomUUID(),
            name: listName,
            products: [],
          });

          setListName("");
        }}
      >
        <InputGroup>
          <InputGroupInput
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          ></InputGroupInput>
          <InputGroupButton
            className="bg-primary text-accent ml-auto cursor:pointer"
            size="sm"
            type="submit"
          >
            Voeg toe
          </InputGroupButton>
        </InputGroup>
      </form>
      {lists.map((list) => (
        <Card
          key={list.id}
          className="hover:shadow-md px-4 transition-shadow cursor-pointer"
        >
          {list.name}
        </Card>
      ))}
    </div>
  );
}
