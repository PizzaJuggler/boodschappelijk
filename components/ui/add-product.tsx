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
import { Spinner } from "./spinner";

type Props = {
  name: string;
  quantity: string;
  unit: ProductUnit | undefined;
  isLoading: boolean;
  onSubmit: () => void;
  onProductNameChange: ChangeEventHandler<HTMLInputElement>;
  onQuantityChange: ChangeEventHandler<HTMLInputElement>;
  onUnitChange: (newUnit: ProductUnit | null) => void;
};

const items = (["stuk", "kg", "L"] satisfies ProductUnit[]).map((unit) => ({
  label: unit,
  value: unit,
}));

export default function AddProduct({
  isLoading,
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
        <Input
          id="productName"
          value={name}
          onChange={onProductNameChange}
          disabled={isLoading}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="quantity">{t("product.quantity")}</FieldLabel>
        <Input
          id="quantity"
          value={quantity}
          onChange={onQuantityChange}
          disabled={isLoading}
        ></Input>
      </Field>

      <Field>
        <FieldLabel htmlFor="unit">{t("product.unit")}</FieldLabel>

        <Select
          id="unit"
          items={items}
          value={unit}
          onValueChange={onUnitChange}
          disabled={isLoading}
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

      <Button
        type="submit"
        disabled={!name?.trim() || +quantity <= 0 || isLoading}
      >
        {t("product.add")}
        {isLoading && <Spinner />}
      </Button>
    </form>
  );
}
