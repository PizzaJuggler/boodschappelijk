import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

type Props = {
  value: string,
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return <InputGroup className="max-w-xs border-2 border-primary py-4">
    <InputGroupInput placeholder="Zoek naar producten" value={value} onChange={(e) => onChange(e.target.value)} />
    <InputGroupAddon>
      <Search className="text-primary" />
    </InputGroupAddon>
  </InputGroup>
}