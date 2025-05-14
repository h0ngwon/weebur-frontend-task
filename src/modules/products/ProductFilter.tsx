"use client";

import { Button } from "@/modules/components/ui/button";
import { Input } from "@/modules/components/ui/input";
import { Search, Star, X as XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

interface Props {
  initialSearchQuery?: string | null;
  initialIsRatingSort?: boolean;
}

const ProductFilter = ({ initialSearchQuery, initialIsRatingSort }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [isRatingSortActive, setIsRatingSortActive] = useState(
    initialIsRatingSort || false
  );

  // URL 파라미터 변경 시 내부 상태 업데이트
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setIsRatingSortActive(searchParams.get("sort") === "rating_desc");
  }, [searchParams]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString()); // 현재 다른 파라미터(sort) 유지
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }
    router.push(`/?${params.toString()}`);
  };

  const toggleRatingSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (!isRatingSortActive) {
      params.set("sort", "rating_desc");
      params.delete("q"); // 정렬 시 검색어는 명시적으로 제거 (모드 변경)
    } else {
      params.delete("sort");
      // 정렬 비활성화 시 q는 유지됨 (만약 있었다면)
    }
    router.push(`/?${params.toString()}`);
  };

  // 검색어 입력 필드 "X" 버튼 클릭 핸들러
  const handleClearSearchQuery = () => {
    setSearchQuery(""); // 내부 상태 초기화
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q"); // URL에서 'q' 파라미터만 제거
    router.push(`/?${params.toString()}`); // 정렬 상태 등 다른 파라미터는 유지
  };

  const showSearchClearButton = searchQuery.trim() !== "";

  return (
    <div className="mb-6 p-4 border rounded-lg bg-card">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        {/* 검색 폼 */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-grow gap-2 items-center w-full sm:w-auto"
        >
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="상품명 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-8 flex-grow"
            />
            {showSearchClearButton && (
              <Button
                type="button"
                onClick={handleClearSearchQuery}
                variant="ghost"
                className="absolute inset-y-0 right-0 flex items-center justify-center w-8 h-full text-muted-foreground hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="검색어 지우기"
              >
                <XIcon className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          <Button
            type="submit"
            variant="secondary"
            className="whitespace-nowrap"
          >
            <Search className="h-4 w-4 mr-2" />
            검색
          </Button>
        </form>

        {/* 별점 정렬 버튼 */}
        <Button
          onClick={toggleRatingSort}
          variant={isRatingSortActive ? "default" : "outline"}
          className="w-full sm:w-auto whitespace-nowrap"
        >
          <Star
            className={`h-4 w-4 mr-2 ${
              isRatingSortActive ? "" : "text-yellow-400 fill-yellow-400"
            }`}
          />
          {isRatingSortActive ? "별점 높은 순 (활성)" : "별점 높은 순"}
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
