import type { Product } from "@/api/dto/product.dto";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ViewMode } from "../hooks/useViewMode";

interface Props {
  product: Product;
  viewMode: ViewMode;
}

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // rating 정수 부분
  const hasHalfStar = rating % 1 >= 0.5 && rating % 1 < 0.9; // rating 소수 부분이 0.5 이상 0.9 미만인 경우
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 남은 별 개수

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf
          key="half"
          className="h-4 w-4 text-yellow-400 fill-yellow-400"
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      <span className="ml-1.5 text-sm text-muted-foreground">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};


const ProductItem = ({ product, viewMode }: Props) => {
  return (
    <Card
      className={`overflow-hidden ${viewMode === "list" ? "w-full flex" : ""}`}
    >
      <CardHeader className={`p-0 ${viewMode === "list" ? "w-1/3" : "w-full"}`}>
        <div
          className={`relative ${
            viewMode === "list" ? "h-48" : "w-full aspect-square"
          }`}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className={`${
              viewMode === "list" ? "object-contain" : "object-cover"
            } ${viewMode === "list" ? "rounded-l-lg" : "rounded-t-lg"}`}
            sizes={
              viewMode === "list"
                ? "(max-width: 768px) 50vw, 33vw"
                : "(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            }
          />
        </div>
      </CardHeader>
      <div
        className={`flex flex-col ${
          viewMode === "list" ? "w-2/3 p-4" : "w-full"
        }`}
      >
        {viewMode === "grid" && (
          <div className="p-4">
            <CardTitle className="text-lg truncate">{product.title}</CardTitle>
            <CardDescription className="mt-1 text-sm h-10 overflow-hidden text-ellipsis">
              {product.description}
            </CardDescription>
          </div>
        )}
        <CardContent
          className={`flex-grow ${viewMode === "grid" ? "p-4 pt-0" : "pt-0"}`}
        >
          {/* 리스트 뷰 제목/설명 (이미지 오른쪽) */}
          {viewMode === "list" && (
            <>
              <CardTitle className="text-lg truncate">
                {product.title}
              </CardTitle>
              <CardDescription className="mt-1 text-sm h-10 overflow-hidden text-ellipsis">
                {product.description}
              </CardDescription>
            </>
          )}
          <div className="mt-2">
            <StarRating rating={product.rating} />
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            리뷰: {product.reviews.length}개
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductItem;
