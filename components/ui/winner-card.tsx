import { Retailer } from "@/stores/RetailerStore/store";
import { Card, CardContent } from "./card";
import { useTranslations } from "next-intl";
import { Empty } from "@/types/empty";
import Image from "next/image";

type Props = {
  retailer: Retailer | Empty;
  discountQuantity: number;
};

export default function WinnerCard({ retailer, discountQuantity }: Props) {
  const t = useTranslations();

  if (discountQuantity === 0) {
    return;
  }

  return (
    <div>
      <Card className="border-primary border-2 bg-accent">
        <CardContent className="grid grid-cols-[auto_1fr] gap-4">
          {retailer && (
            <Image
              width={21}
              height={21}
              alt={retailer}
              src={`/img/stores/${retailer}-logo.webp`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div>
            {retailer && (
              <div className="font-bold">
                {t("winner.mostDiscounts", {
                  retailer: t(`retailers.${retailer}`),
                })}
                .
              </div>
            )}
            <div>{t("winner.totalDiscounts", { count: discountQuantity })}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
