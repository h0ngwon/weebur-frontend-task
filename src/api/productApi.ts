import axios from "axios";
import type { ProductsResponse } from "./dto/product.dto";

const DUMMYJSON_API_BASE_URL = "https://dummyjson.com";

interface Cursor {
  limit?: number;
  skip?: number;
}

export async function getProducts(cursor: Cursor): Promise<ProductsResponse> {
  try {
    const response = await axios.get<ProductsResponse>(
      `${DUMMYJSON_API_BASE_URL}/products`,
      {
        params: {
          limit: cursor.limit ?? 20,
          skip: cursor.skip ?? 0,
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
