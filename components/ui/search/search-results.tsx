import { RetailProduct } from "@/types/retail-product";
import { ProductCard } from "../retail-product-card";
import { Spinner } from "../spinner";

type Props = {
  results: RetailProduct[];
  loading: boolean;
};

export default function SearchResults({ results, loading }: Props) {
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 flex-col py-4">
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
