"use client";
import { searchProducts } from "@/api/price-prophet";
import { ProductSearchResult } from "@/api/price-prophet/model";
import AddProduct from "@/components/ui/add-product";
import ProductCard from "@/components/ui/product-card";
import RetailFilter from "@/components/ui/retail-filter";
import WinnerCard from "@/components/ui/winner-card";
import {
  selectedListWithFilteredDiscounts,
  selectSelectedList,
} from "@/stores/ProductList/selectors";
import { useProductListStore } from "@/stores/ProductList/store";
import { selectedRetailers } from "@/stores/RetailerStore/selectors";
import { Retailer, useRetailerStore } from "@/stores/RetailerStore/store";
import { mapProductUnit, ProductUnit } from "@/types/product";
import { RetailProduct } from "@/types/retail-product";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function listWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <List />
    </Suspense>
  );
}

function List() {
  const t = useTranslations();
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<ProductUnit>("stuk");
  const { id } = useParams();
  const { addProduct, removeProduct, selectList } = useProductListStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedList = useProductListStore(selectSelectedList);
  const retailers = useRetailerStore(selectedRetailers);

  const filteredList = selectedListWithFilteredDiscounts(
    selectedList,
    retailers,
  );

  useEffect(() => {
    if (typeof id === "string") {
      selectList(id);
    }
  }, [id]);

  const list = useProductListStore(selectSelectedList);
  const cheapestRetailerCount: Map<Retailer, number> = new Map();

  filteredList?.products.forEach((product) => {
    const alreadyAddedRetailer = new Set<Retailer>();
    product.productDiscounts?.forEach((discount) => {
      const cheapestRetailer = discount.retailer;

      if (alreadyAddedRetailer.has(cheapestRetailer)) {
        return;
      }

      alreadyAddedRetailer.add(cheapestRetailer);
      if (cheapestRetailerCount.has(cheapestRetailer)) {
        cheapestRetailerCount.set(
          cheapestRetailer,
          (cheapestRetailerCount.get(cheapestRetailer) ?? 0) + 1,
        );
      } else {
        cheapestRetailerCount.set(cheapestRetailer, 1);
      }
    });
  });

  const entries = [...cheapestRetailerCount.entries()];

  const [retailer, discountQuantity] = entries.length
    ? entries.reduce((max, current) => (current[1] > max[1] ? current : max))
    : [null, 0];

  const submitProduct = async () => {
    setIsSubmitting(true);
    const productDiscounts = await searchProducts({
      q: productName,
      sort_by: "price",
    });

    const mapper: (products: ProductSearchResult[]) => RetailProduct[] = (
      products,
    ) => {
      return products.map((product) => ({
        id: product.base_product_id ?? "",
        imgSrc: product.image_url ?? "",
        name: product.name ?? "",
        quantity: product.quantity ?? "",
        savingsAmount: product.savings_amount,
        unit: mapProductUnit(product.unit),
        unitPrice: product.unit_price,
        validFrom: product.valid_from,
        validUntil: product.valid_until,
        multiBuyPrice: product.multi_buy_price,
        multiBuyQuantity: product.multi_buy_quantity,
        retailer: product.retailer as Retailer,
      }));
    };

    if (list?.id) {
      addProduct({
        id: crypto.randomUUID(),
        name: productName,
        quantity: Number(quantity),
        unit,
        productDiscounts: mapper(
          "results" in productDiscounts.data
            ? productDiscounts.data?.results
            : [],
        ),
      });
    }

    setProductName("");
    setQuantity("1");
    setUnit("stuk");
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-2xl">{list?.name}</h1>
      <WinnerCard retailer={retailer} discountQuantity={discountQuantity} />
      <AddProduct
        isLoading={isSubmitting}
        name={productName}
        quantity={quantity}
        unit={unit}
        onProductNameChange={(e) => {
          setProductName(e.target.value);
        }}
        onQuantityChange={(e) => setQuantity(e.target.value)}
        onUnitChange={(newUnit) => {
          if (!!newUnit) {
            setUnit(newUnit);
          }
        }}
        onSubmit={submitProduct}
      />

      <div className="flex flex-col gap-4">
        <RetailFilter />

        {filteredList?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
