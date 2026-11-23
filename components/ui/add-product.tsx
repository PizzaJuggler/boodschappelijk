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
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

  return (
    <form
      className="flex gap-4 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Field>
        <FieldLabel htmlFor="name">{t("product.name")}</FieldLabel>
        <Input id="productName" value={name} onChange={onProductNameChange} />
      </Field>

      <Field>
        <FieldLabel htmlFor="quantity">{t("product.quantity")}</FieldLabel>
        <Input
          id="quantity"
          value={quantity}
          onChange={onQuantityChange}
        ></Input>
      </Field>

      <Field>
        <FieldLabel htmlFor="unit">{t("product.unit")}</FieldLabel>

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

      <Button type="submit">{t("product.add")}</Button>
    </form>
  );
}
