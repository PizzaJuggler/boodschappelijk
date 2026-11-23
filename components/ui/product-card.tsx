import { Product } from "@/types/product";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { useProductListStore } from "@/stores/ProductList/store";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { removeProduct } = useProductListStore();
  const t = useTranslations();

  return (
    <Card key={product.id}>
      <CardContent className="grid grid-cols-[1fr_1fr_1fr_auto] items-center">
        <span>{product.name}</span>

        <span>
          {product.unit === "stuk" && (
            <span>{t("product.pieces", { count: product.quantity })}</span>
          )}
          {product.unit !== "stuk" && (
            <span>
              {" "}
              {product.quantity} {product.unit}
            </span>
          )}
        </span>

        <span>
          <span
            className={
              product.productDiscounts.length === 0
                ? "text-muted-foreground"
                : "rounded-full bg-primary/75 text-white px-2 py-1"
            }
          >
            {t("product.discounts", {
              count: product.productDiscounts.length,
            })}
          </span>
        </span>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => removeProduct(product.id)}>
            <Trash />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
