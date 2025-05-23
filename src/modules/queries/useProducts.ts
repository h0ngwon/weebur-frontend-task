import type { Product, ProductsResponse } from "@/api/dto/product.dto";
import { getProducts } from "@/api/productApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const PRODUCT_LIST_QUERY_KEY_PREFIX = "productsList";

interface Options {
  initialLimit?: number;
  sortBy?: string | undefined;
  order?: "asc" | "desc" | undefined;
  enabled?: boolean;
}

export const useProducts = (options?: Options) => {
  const { initialLimit = 20, sortBy, order, enabled = true } = options ?? {};

  // queryKey에 정렬 조건 포함
  const queryKeyParams: Record<string, string | number> = {
    limit: initialLimit,
  };
  if (sortBy) {
    queryKeyParams.sortBy = sortBy;
    if (order) {
      queryKeyParams.order = order;
    }
  }

  return useInfiniteQuery<
    ProductsResponse,
    Error,
    Product[],
    (string | Record<string, unknown>)[],
    number
  >({
    queryKey: [PRODUCT_LIST_QUERY_KEY_PREFIX, queryKeyParams],
    queryFn: async ({ pageParam = 0 }) =>
      getProducts({
        limit: initialLimit,
        skip: pageParam,
        sortBy: sortBy,
        order: order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductsResponse) => {
      // API 응답의 limit 또는 요청 시 initialLimit 사용
      const currentLimit = lastPage.limit || initialLimit;
      const nextSkip = lastPage.skip + currentLimit;
      if (nextSkip < lastPage.total) {
        return nextSkip;
      }
      return undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.products);
    },
    enabled: enabled,
  });
};
