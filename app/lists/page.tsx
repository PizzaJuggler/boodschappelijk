"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useProductListStore } from "@/stores/ProductList/store";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [listName, setListName] = useState("");
  const { lists, addList, removeList } = useProductListStore();
  const t = useTranslations();

  return (
    <>
      <h1 className="font-bold text-2xl">Lijsten</h1>
      <form
        className="flex gap-4 items-end"
        onSubmit={(e) => {
          e.preventDefault();
          addList(listName);
          setListName("");
        }}
      >
        <Field>
          <FieldLabel htmlFor="name">Naam</FieldLabel>
          <Input
            id="name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </Field>
        <Button type="submit">Voeg lijst toe +</Button>
      </form>
      {lists.map((list) => (
        <Link key={list.id} href={`/lists/${list.id}`}>
          <Card className="hover:shadow-md px-4 transition-shadow cursor-pointer flex flex-col">
            <CardContent className="grid grid-cols-[1fr_1fr_auto] items-center">
              <div>{list.name}</div>
              <div>{t("product.label", { count: list.products.length })}</div>
              <Button variant="ghost" onClick={() => removeList(list.id)}>
                <Trash />
              </Button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
