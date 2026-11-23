import { RetailProduct } from "@/types/retail-product";
import { Card } from "./card";
import Image from "next/image";

function RetailProductCard({ product }: { product: RetailProduct }) {
  return (
    <Card
      key={product.id}
      className="hover:shadow-md transition-shadow cursor-pointer flex gap-4 flex-row items-center py-0 pl-2"
    >
      <div className="relative w-10 shrink-0 self-stretch flex items-center justify-center">
        <Image
          src={product.imgSrc}
          alt={product.name}
          width={64}
          height={64}
          className="object-cover"
        />
      </div>
      <div className="py-2">
        <div className="font-bold">{product.name}</div>
        <div className="text-muted-foreground">{product.quantity}</div>
      </div>
    </Card>
  );
}

export { RetailProductCard as ProductCard };
