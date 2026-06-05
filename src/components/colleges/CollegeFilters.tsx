"use client";

import type { CollegeFilters as Filters, CollegeType } from "@/types/college";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface CollegeFiltersProps {
  filters: Filters;
  states: string[];
  onChange: (filters: Filters) => void;
  total: number;
  isMobile?: boolean;
  onClose?: () => void;
}

const typeOptions: { value: CollegeType; label: string }[] = [
  { value: "Government", label: "Government" },
  { value: "Private", label: "Private" },
  { value: "Deemed", label: "Deemed" },
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "fees-asc", label: "Fees: Low to High" },
  { value: "fees-desc", label: "Fees: High to Low" },
  { value: "name", label: "Name (A-Z)" },
];

const ratingOptions = [
  { value: "", label: "Any Rating" },
  { value: "3", label: "3+ Stars" },
  { value: "4", label: "4+ Stars" },
  { value: "4.5", label: "4.5+ Stars" },
];

const feesOptions = [
  { value: "", label: "Any Budget" },
  { value: "50000", label: "Under ₹50K" },
  { value: "200000", label: "Under ₹2L" },
  { value: "400000", label: "Under ₹4L" },
  { value: "600000", label: "Under ₹6L" },
];

export function CollegeFilters({
  filters,
  states,
  onChange,
  total,
  isMobile,
  onClose,
}: CollegeFiltersProps) {
  const update = (partial: Partial<Filters>) => {
    onChange({ ...filters, ...partial });
  };

  const clearFilters = () => {
    onChange({ search: filters.search, sortBy: "rating" });
  };

  const hasActiveFilters =
    filters.state || filters.type || filters.minRating || filters.maxFees;

  return (
    <div className={`space-y-5 ${isMobile ? "p-4" : ""}`}>
      {isMobile && (
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <p className="text-sm text-slate-500">
        <span className="font-semibold text-slate-800">{total}</span> colleges found
      </p>

      <Select
        label="State"
        placeholder="All States"
        value={filters.state || ""}
        onChange={(e) => update({ state: e.target.value || undefined })}
        options={states.map((s) => ({ value: s, label: s }))}
      />

      <Select
        label="College Type"
        placeholder="All Types"
        value={filters.type || ""}
        onChange={(e) =>
          update({ type: (e.target.value as CollegeType) || undefined })
        }
        options={typeOptions}
      />

      <Select
        label="Minimum Rating"
        value={filters.minRating ? String(filters.minRating) : ""}
        onChange={(e) =>
          update({ minRating: e.target.value ? Number(e.target.value) : undefined })
        }
        options={ratingOptions}
      />

      <Select
        label="Max Annual Fees"
        value={filters.maxFees ? String(filters.maxFees) : ""}
        onChange={(e) =>
          update({ maxFees: e.target.value ? Number(e.target.value) : undefined })
        }
        options={feesOptions}
      />

      <Select
        label="Sort By"
        value={filters.sortBy || "rating"}
        onChange={(e) =>
          update({ sortBy: e.target.value as Filters["sortBy"] })
        }
        options={sortOptions}
      />

      {hasActiveFilters && (
        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}

      {isMobile && (
        <Button className="w-full" onClick={onClose}>
          Show {total} Results
        </Button>
      )}
    </div>
  );
}
