import type { Product } from "@/api/dto/product.dto";
import { ViewMode } from "../hooks/useViewMode";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
  viewMode: ViewMode;
}

const ProductList = ({ products, viewMode }: Props) => {
  if (!products || products.length === 0) {
    return <p>표시할 상품이 없습니다.</p>;
  }

  const gridClasses =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
  const listClasses = "flex flex-col gap-4";

  return (
    <div className={viewMode === "grid" ? gridClasses : listClasses}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default ProductList;
