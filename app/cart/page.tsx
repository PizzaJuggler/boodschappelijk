
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/components/ui/product-card";

const products: Product[] = [
  {
    id: "2f575d68-52d9-4ef4-b4ab-cc585376edcc",
    name: "Pizzadeeg",
    img: "https://www.jumbo.com/dam-images/fit-in/360x360/Products/14052026_1778725562026_1778725568610_137181_PAK_07622300571351_H1N1_s01.png",
    quantity: "80gr"
  },
  {
    id: "d8204b5e-0759-4d7e-8964-9bc09ebcf510",
    name: "Mozarella",
    img: "https://www.jumbo.com/dam-images/fit-in/360x360/Products/8721317704345_1790317992708_08721317704345_H1N1.png",
    quantity: "120gr"
  },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background px-4 py-4 gap-4">
      <h1 className="font-bold text-xl">Pizza Party</h1>
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  );
}
