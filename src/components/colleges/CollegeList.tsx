"use client";

import type { College } from "@/types/college";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { CollegeCard } from "./CollegeCard";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

interface CollegeListProps {
  colleges: College[];
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  loadMore: () => void;
  refresh: () => void;
}

export function CollegeList({
  colleges,
  total,
  hasMore,
  isLoading,
  isLoadingMore,
  error,
  loadMore,
  refresh,
}: CollegeListProps) {
  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    isLoading: isLoadingMore || isLoading,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Failed to load colleges"
        description={error}
        action={
          <Button onClick={refresh} variant="outline">
            Try Again
          </Button>
        }
      />
    );
  }

  if (colleges.length === 0) {
    return (
      <EmptyState
        title="No colleges found"
        description="Try adjusting your search or filters to find more results."
      />
    );
  }

  return (
    <div>
      <p className="mb-5 text-sm text-slate-600">
        Found <span className="font-bold text-indigo-600">{total}</span> colleges
      </p>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>

      {hasMore && <div ref={sentinelRef} className="h-8" />}

      {isLoadingMore && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {hasMore && !isLoadingMore && (
        <div className="flex justify-center py-8">
          <Button variant="outline" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
