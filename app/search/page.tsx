import { Card } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import Link from "next/link";

const lists = [
  {
    id: "2f575d68-52d9-4ef4-b4ab-cc585376edcc",
    name: "Pizza party"
  },
  {
    id: "d8204b5e-0759-4d7e-8964-9bc09ebcf510",
    name: "Verjaardag"
  },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background px-4 py-4 gap-4">
      Geselecteerde lijst:
      <InputGroup className="max-w-xs border-2 border-primary py-4">
        <InputGroupInput placeholder="Zoek naar producten" />
        <InputGroupAddon>
          <Search className="text-primary" />
        </InputGroupAddon>
      </InputGroup>


    </div>
  );
}
