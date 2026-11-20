"use client";

import { useState } from "react";
import SearchInput from "./search-input";
import SearchResults from "./search-results";
import { useSearch } from "./hooks/useSearch";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearch(query);

  return (
    <div className="relative w-full max-w-xl">
      <SearchInput
        value={query}
        onChange={setQuery}
      />

      {query.length > 0 && (
        <SearchResults
          results={results}
          loading={loading}
        />
      )}
    </div>
  );
}