"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CollegeFilters } from "@/types/college";
import { CollegeSearch } from "@/components/colleges/CollegeSearch";
import { CollegeFilters as FiltersPanel } from "@/components/colleges/CollegeFilters";
import { CollegeList } from "@/components/colleges/CollegeList";
import { useColleges } from "@/hooks/useColleges";

export function CollegesPageClient() {
  const searchParams = useSearchParams();
  const searchParamValue = searchParams.get("search") || "";

  const [filters, setFilters] = useState<CollegeFilters>({
    search: searchParamValue || undefined,
    sortBy: "rating",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL search query to filter state
  useEffect(() => {
    setFilters((prev) => {
      if (prev.search === (searchParamValue || undefined)) return prev;
      return { ...prev, search: searchParamValue || undefined };
    });
  }, [searchParamValue]);

  const {
    colleges,
    total,
    hasMore,
    states,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    refresh,
  } = useColleges({ filters, pageSize: 6 });

  const updateFilters = useCallback((next: CollegeFilters) => {
    setFilters(next);
  }, []);

  const handleSearchChange = useCallback(
    (search: string) => {
      setFilters((prev) => ({ ...prev, search: search || undefined }));
    },
    []
  );

  return (
    <div>
      <div className="page-header px-4 py-10 sm:px-6">
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="section-label">Explore</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Find your college
          </h1>
          <p className="mt-2 max-w-xl text-slate-600">
            Browse and filter{" "}
            <span className="font-semibold text-indigo-600">{total > 0 ? total : "20+"}</span>{" "}
            colleges to find your best match.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <CollegeSearch
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
          >
            <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters & Sort
          </button>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="card sticky top-24 p-6">
              <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-500">
                Filters
              </h2>
              <FiltersPanel
                filters={filters}
                states={states}
                onChange={updateFilters}
                total={total}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <CollegeList
              colleges={colleges}
              total={total}
              hasMore={hasMore}
              isLoading={isLoading}
              isLoadingMore={isLoadingMore}
              error={error}
              loadMore={loadMore}
              refresh={refresh}
            />
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
            <div className="mx-auto mb-4 mt-3 h-1 w-10 rounded-full bg-slate-200" />
            <FiltersPanel
              filters={filters}
              states={states}
              onChange={updateFilters}
              total={total}
              isMobile
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
