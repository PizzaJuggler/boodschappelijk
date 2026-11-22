import { ChangeEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ProductUnit } from "@/types/product";
import { Input } from "./input";
import { Button } from "./button";
import { Field, FieldLabel } from "./field";

type Props = {
  title: string;
  name: string | number | readonly string[] | undefined;
  quantity: string | number | readonly string[] | undefined;
  unit: ProductUnit | undefined;
  onSubmit: () => void;
  onProductNameChange: ChangeEventHandler<HTMLInputElement>;
  onQuantityChange: ChangeEventHandler<HTMLInputElement>;
  onUnitChange: (newUnit: ProductUnit | null) => void;
};

const items = (["stuk", "g", "L"] satisfies ProductUnit[]).map((unit) => ({
  label: unit,
  value: unit,
}));

export default function AddProduct({
  title,
  name,
  quantity,
  unit,
  onSubmit,
  onProductNameChange,
  onQuantityChange,
  onUnitChange,
}: Props) {
  return (
    <form
      className="flex gap-4 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Field>
        <FieldLabel htmlFor="name">Productnaam</FieldLabel>
        <Input
          id="productName"
          value={name}
          onChange={onProductNameChange}
        ></Input>
      </Field>

      <Field>
        <FieldLabel htmlFor="quantity">Hoeveelheid</FieldLabel>
        <Input
          id="quantity"
          value={quantity}
          onChange={onQuantityChange}
        ></Input>
      </Field>

      <Field>
        <FieldLabel htmlFor="unit">Eenheid</FieldLabel>

        <Select
          id="unit"
          items={items}
          value={unit}
          onValueChange={onUnitChange}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Eenheid</SelectLabel>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Button type="submit">Voeg product toe +</Button>
    </form>
  );
}
