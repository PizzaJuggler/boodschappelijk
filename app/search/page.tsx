import { Card } from "@/components/ui/card";
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
      <h1 className="font-bold text-2xl">Lijsten</h1>
      {
        lists.map((list) => (
          <Link key={list.id} href='/list'>
            <Card className="hover:shadow-md px-4 transition-shadow cursor-pointer">
              {list.name}
            </Card>
          </Link>
        ))
      }
    </div>
  );
}
