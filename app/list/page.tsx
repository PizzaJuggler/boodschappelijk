
import { Card } from "@/components/ui/card";
import Image from "next/image";

const lists = [
  {
    id: "2f575d68-52d9-4ef4-b4ab-cc585376edcc",
    name: "Pizzadeeg",
    img: "https://www.jumbo.com/dam-images/fit-in/360x360/Products/14052026_1778725562026_1778725568610_137181_PAK_07622300571351_H1N1_s01.png"
  },
  {
    id: "d8204b5e-0759-4d7e-8964-9bc09ebcf510",
    name: "Mozarella",
    img: "https://www.jumbo.com/dam-images/fit-in/360x360/Products/8721317704345_1790317992708_08721317704345_H1N1.png"
  },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background px-4 py-4 gap-4">
      <h1 className="font-bold text-2xl">Producten</h1>
      {
        lists.map((list) => (
          <Card key={list.id} className="hover:shadow-md px-4 transition-shadow cursor-pointer flex gap-4 flex-row items-center py-0">

            <div className="relative w-10 shrink-0 self-stretch ">
              <Image
                src={list.img}
                alt={list.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="py-2">
              {list.name}
            </div>

          </Card>
        ))
      }
    </div>
  );
}
