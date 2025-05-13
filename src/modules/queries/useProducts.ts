import type { Product, ProductsResponse } from "@/api/dto/product.dto";
import { getProducts } from "@/api/productApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const PRODUCT_QUERY_KEY_PREFIX = "products";

interface Options {
  initialLimit?: number;
}

export const useProducts = (options?: Options) => {
  const { initialLimit = 20 } = options ?? {};

  return useInfiniteQuery<
    ProductsResponse,
    Error,
    Product[],
    (string | Record<string, unknown>)[],
    number
  >({
    queryKey: [PRODUCT_QUERY_KEY_PREFIX, { limit: initialLimit }],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getProducts({
        limit: initialLimit,
        skip: pageParam,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: ProductsResponse) => {
      const nextSkip = lastPage.skip + initialLimit;

      if (nextSkip < lastPage.total) {
        return nextSkip;
      }
      return undefined;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.products);
    },
  });
};
