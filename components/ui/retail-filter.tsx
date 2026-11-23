import { Filter } from "lucide-react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./combobox";
import {
  Retailer,
  RETAILERS,
  useRetailerStore,
} from "@/stores/RetailerStore/store";
import React from "react";
import { Field, FieldLabel } from "./field";
import { useTranslations } from "next-intl";

const retailers: { label: string; value: string }[] = RETAILERS.map(
  (retailer) => ({ label: retailer, value: retailer }),
);

export default function retailFilter() {
  const t = useTranslations();
  const { selectedRetailers, setSelectedRetailers } = useRetailerStore();
  const anchor = useComboboxAnchor();

  return (
    <div className="flex gap-4 items-end">
      <Filter className="w-4 mb-1" />
      <Field>
        <FieldLabel htmlFor="retailers">Supermarkten</FieldLabel>
        <Combobox
          id="retailers"
          items={retailers}
          multiple
          value={selectedRetailers}
          onValueChange={(retailers) => {
            setSelectedRetailers(retailers as Retailer[]);
          }}
        >
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {(values) => (
                <React.Fragment>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>
                      {t(`retailers.${value}`)}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.label} value={item.value}>
                  {t(`retailers.${item.label}`)}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  );
}
