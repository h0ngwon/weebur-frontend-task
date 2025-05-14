import type { Product, ProductsResponse } from "@/api/dto/product.dto";
import { searchProducts } from "@/api/productApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const PRODUCT_SEARCH_QUERY_KEY_PREFIX = "productSearch";

interface Options {
  initialLimit?: number;
  q: string;
}

export const useSearchProducts = (options: Options) => {
  const { initialLimit = 20, q } = options;

  return useInfiniteQuery<
    ProductsResponse,
    Error,
    Product[],
    (string | Record<string, unknown>)[],
    number
  >({
    queryKey: [PRODUCT_SEARCH_QUERY_KEY_PREFIX, { q, limit: initialLimit }],
    queryFn: async ({ pageParam = 0 }) =>
      searchProducts({
        q,
        limit: initialLimit,
        skip: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductsResponse) => {
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
    enabled: !!q,
  });
};
