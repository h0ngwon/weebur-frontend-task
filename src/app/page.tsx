"use client";

import { Button } from "@/modules/components/ui/button";
import { useViewMode } from "@/modules/hooks/useViewMode";
import ProductFilter from "@/modules/products/ProductFilter";
import ProductList from "@/modules/products/ProductList";
import { useProducts } from "@/modules/queries/useProducts";
import { useSearchProducts } from "@/modules/queries/useSearchProducts";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export default function Page() {
  const { viewMode, toggleViewMode } = useViewMode();
  const searchParams = useSearchParams();

  const currentSearchQuery = searchParams.get("q");
  const currentSort = searchParams.get("sort");

  const isSearchMode = !!currentSearchQuery;

  const searchResult = useSearchProducts({
    q: currentSearchQuery || "",
    initialLimit: 20,
  });

  const listResult = useProducts({
    initialLimit: 20,
    sortBy:
      !isSearchMode && currentSort === "rating_desc" ? "rating" : undefined,
    order: !isSearchMode && currentSort === "rating_desc" ? "desc" : undefined,
    enabled: !isSearchMode,
  });

  const activeQueryResult = isSearchMode ? searchResult : listResult;

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = activeQueryResult;

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.4,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ProductFilter
        initialSearchQuery={currentSearchQuery}
        initialIsRatingSort={currentSort === "rating_desc"}
      />

      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">상품 목록</h1>
        <Button onClick={toggleViewMode} variant="outline">
          {viewMode === "list" ? "그리드 보기" : "리스트 보기"}
        </Button>
      </div>

      {!isLoading && (!products || products.length === 0) ? (
        <div className="text-center py-10 text-muted-foreground">
          <p>
            {isSearchMode
              ? "일치하는 결과가 없습니다."
              : "표시할 상품이 없습니다."}
          </p>
        </div>
      ) : (
        products &&
        products.length > 0 && (
          <ProductList products={products} viewMode={viewMode} />
        )
      )}

      <div ref={ref} className="mt-6 text-center h-10">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
          </div>
        )}
        {!isFetchingNextPage &&
          !hasNextPage &&
          products &&
          products.length > 0 && (
            <p className="py-4 text-muted-foreground">
              모든 상품을 불러왔습니다.
            </p>
          )}
      </div>
    </div>
  );
}
