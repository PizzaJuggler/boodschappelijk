import { Card } from "./card";
import Image from "next/image";

function ProductCard({ product }: { product: Product }) {
    return <Card key={product.id} className="hover:shadow-md px-4 transition-shadow cursor-pointer flex gap-4 flex-row items-center py-0">
        <div className="relative w-10 shrink-0 self-stretch ">
            <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover"
            />
        </div>
        <div className="py-2">
            <div className="font-bold">{product.name}</div>
            <div className="text-muted-foreground">{product.quantity}</div>
        </div>
    </Card>
}

export { ProductCard };