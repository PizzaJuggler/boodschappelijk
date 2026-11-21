"use client";

import { useState } from "react";
import SearchInput from "./search-input";
import SearchResults from "./search-results";
import {
  searchProductsResponse,
  searchProductsResponseSuccess,
  useSearchProducts,
} from "@/api/price-prophet";
import { useDebounce } from "react-use";
import { RetailProduct } from "@/types/retail-product";
import { ProductSearchResult, SearchResponse } from "@/api/price-prophet/model";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useDebounce(
    () => {
      setDebouncedQuery(query.trim());
      console.log("whoa");
    },
    1000,
    [query],
  );

  const mapper: (products: ProductSearchResult[]) => RetailProduct[] = (
    products,
  ) => {
    return products.map((product) => ({
      id: product.base_product_id ?? "",
      imgSrc: product.image_url ?? "",
      name: product.name ?? "",
      quantity: product.quantity ?? "",
    }));
  };

  const { data, isLoading } = useSearchProducts(
    { q: debouncedQuery },
    {
      query: {
        enabled: debouncedQuery.length >= 4,
        select: (response) =>
          mapper(
            "data" in response && "results" in response.data
              ? response.data.results
              : [],
          ),
      },
    },
  );

  return (
    <div className="relative w-full">
      <SearchInput value={query} onChange={setQuery} />

      {query.length > 0 && (
        <SearchResults results={data ?? []} loading={isLoading} />
      )}
    </div>
  );
}
