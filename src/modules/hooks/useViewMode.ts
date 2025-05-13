"use client";

import { useCallback, useEffect, useState } from "react";

export type ViewMode = "list" | "grid";

const VIEW_MODE_STORAGE_KEY = "productViewMode";
const VIEW_MODE_EXPIRY_KEY = "productViewModeExpiry";
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export const useViewMode = () => {
  const [viewMode, setViewModeState] = useState<ViewMode>("grid"); // 기본값 그리드 (초기화 시 변경됨)

  useEffect(() => {
    const storedViewMode = localStorage.getItem(
      VIEW_MODE_STORAGE_KEY
    ) as ViewMode | null;
    const storedExpiry = localStorage.getItem(VIEW_MODE_EXPIRY_KEY);
    const now = new Date().getTime();

    if (storedViewMode && storedExpiry && now < parseInt(storedExpiry, 10)) {
      setViewModeState(storedViewMode);
    } else {
      // 50% 확률로 랜덤 결정
      const newMode = Math.random() < 0.5 ? "list" : "grid";
      setViewModeState(newMode);
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, newMode);
      localStorage.setItem(
        VIEW_MODE_EXPIRY_KEY,
        (now + TWENTY_FOUR_HOURS_MS).toString()
      );
    }
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewModeState((prevMode) => {
      const newMode = prevMode === "list" ? "grid" : "list";
      const now = new Date().getTime();
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, newMode);
      localStorage.setItem(
        VIEW_MODE_EXPIRY_KEY,
        (now + TWENTY_FOUR_HOURS_MS).toString()
      );
      return newMode;
    });
  }, []);

  return { viewMode, toggleViewMode };
};
