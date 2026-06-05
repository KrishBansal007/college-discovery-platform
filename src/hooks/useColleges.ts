"use client";

import { searchColleges } from "@/lib/colleges";
import type { College, CollegeFilters, CollegesResponse } from "@/types/college";
import { useCallback, useEffect, useState } from "react";

interface UseCollegesOptions {
  filters: CollegeFilters;
  pageSize?: number;
}

interface UseCollegesReturn {
  colleges: College[];
  total: number;
  hasMore: boolean;
  states: string[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  loadMore: () => void;
  refresh: () => void;
}

function query(filters: CollegeFilters, page: number, pageSize: number): CollegesResponse {
  return searchColleges(filters, page, pageSize);
}

export function useColleges({ filters, pageSize = 6 }: UseCollegesOptions): UseCollegesReturn {
  const filtersKey = JSON.stringify(filters);

  const [colleges, setColleges] = useState<College[]>(
    () => query(filters, 1, pageSize).colleges
  );
  const [total, setTotal] = useState(() => query(filters, 1, pageSize).total);
  const [hasMore, setHasMore] = useState(() => query(filters, 1, pageSize).hasMore);
  const [states, setStates] = useState<string[]>(() => query(filters, 1, pageSize).states);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(filtersKey) as CollegeFilters;
      const data = query(parsed, 1, pageSize);
      setColleges(data.colleges);
      setTotal(data.total);
      setHasMore(data.hasMore);
      setStates(data.states);
      setPage(1);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setColleges([]);
      setTotal(0);
      setHasMore(false);
    }
  }, [filtersKey, pageSize]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const parsed = JSON.parse(filtersKey) as CollegeFilters;
      const nextPage = page + 1;
      const data = query(parsed, nextPage, pageSize);
      setColleges((prev) => [...prev, ...data.colleges]);
      setTotal(data.total);
      setHasMore(data.hasMore);
      setPage(nextPage);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoadingMore(false);
    }
  }, [filtersKey, pageSize, page, hasMore, isLoadingMore]);

  const refresh = useCallback(() => {
    try {
      const parsed = JSON.parse(filtersKey) as CollegeFilters;
      const data = query(parsed, 1, pageSize);
      setColleges(data.colleges);
      setTotal(data.total);
      setHasMore(data.hasMore);
      setStates(data.states);
      setPage(1);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [filtersKey, pageSize]);

  return {
    colleges,
    total,
    hasMore,
    states,
    isLoading: false,
    isLoadingMore,
    error,
    loadMore,
    refresh,
  };
}
