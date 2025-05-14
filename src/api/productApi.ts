import axios from "axios";
import type { ProductsResponse } from "./dto/product.dto";

const DUMMYJSON_API_BASE_URL = "https://dummyjson.com";

interface Cursor {
  limit?: number;
  skip?: number;
}

interface ProductParams extends Cursor {
  sortBy?: string;
  order?: "asc" | "desc";
}

export async function getProducts(
  params: ProductParams
): Promise<ProductsResponse> {
  try {
    const response = await axios.get<ProductsResponse>(
      `${DUMMYJSON_API_BASE_URL}/products`,
      {
        params: {
          limit: params.limit ?? 20,
          skip: params.skip ?? 0,
          sortBy: params.sortBy,
          order: params.order,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `프로덕트 목록을 불러오는데 실패했습니다: ${error.message}`
      );
    } else {
      throw new Error("프로덕트 목록을 불러오는데 실패했습니다.");
    }
  }
}

interface SearchProductsParams extends Cursor {
  q: string;
}

export async function searchProducts(
  params: SearchProductsParams
): Promise<ProductsResponse> {
  try {
    const { q, limit = 20, skip = 0 } = params;
    const response = await axios.get<ProductsResponse>(
      `${DUMMYJSON_API_BASE_URL}/products/search`,
      {
        params: {
          q,
          limit,
          skip,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`상품 검색에 실패했습니다: ${error.message}`);
    } else {
      throw new Error("상품 검색 중 예상치 못한 오류가 발생했습니다.");
    }
  }
}
