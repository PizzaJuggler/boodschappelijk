import { Filter } from "lucide-react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox";
import { useRetailerStore } from "@/stores/RetailerStore/store";

const retailers: { label: string; value: string }[] = [
  "albert_heijn",
  "jumbo",
  "aldi",
  "lidl",
  "ekoplaza",
  "plus",
  "poiesz",
  "spar",
  "nettorama",
  "boni",
  "coop",
  "gewoon_coop",
  "mcd",
  "boons_markt",
  "dagwinkel",
  "amazing_oriental",
  "dekamarkt",
  "hoogvliet",
  "vomar",
  "dirk",
].map((retailer) => ({ label: retailer, value: retailer }));

export default function retailFilter() {
  const { selectedRetailers, setSelectedRetailers } = useRetailerStore();

  return (
    <div className="flex gap-4 items-center">
      <Filter className="w-4" />
      <Combobox
        items={retailers}
        multiple
        value={selectedRetailers}
        onValueChange={(retailers) => {
          setSelectedRetailers(retailers);
        }}
      >
        <ComboboxInput placeholder="Selecteer supermarkten" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.label} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
