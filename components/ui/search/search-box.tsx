"use client";

import { useState } from "react";
import SearchInput from "./search-input";
import SearchResults from "./search-results";
import { useSearchProducts } from "@/api/price-prophet";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const { data, isLoading } = useSearchProducts({ q: query }, { query: { enabled: query.trim().length >= 3 } });


  return (
    <div className="relative w-full max-w-xl">
      <SearchInput
        value={query}
        onChange={setQuery}
      />

      {query.length > 0 && (
        <SearchResults
          results={[]}
          loading={isLoading}
        />
      )}
    </div>
  );
}