"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { College } from "@/types/college";
import { getCollegesByIds } from "@/lib/colleges";
import { useCompare } from "@/components/compare/CompareProvider";
import { CompareTable } from "@/components/compare/CompareTable";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CollegeSearch } from "@/components/colleges/CollegeSearch";
import { colleges as allColleges } from "@/data/colleges";

export function ComparePageClient() {
  const { selectedIds, addCollege, removeCollege, clearAll, canAdd } = useCompare();
  const [search, setSearch] = useState("");
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";

  const initialIds = useMemo(() => {
    return idsParam.split(",").filter(Boolean);
  }, [idsParam]);

  // Sync URL ids into compare context once on mount or when ids change
  useEffect(() => {
    initialIds.forEach((id) => addCollege(id));
    setHydrated(true);
  }, [initialIds, addCollege]);

  const activeIds = useMemo(() => {
    const ids = selectedIds.length > 0 ? selectedIds : initialIds;
    return [...new Set(ids)];
  }, [selectedIds, initialIds]);

  const colleges = useMemo<College[]>(() => {
    if (!hydrated && activeIds.length === 0) return [];
    return getCollegesByIds(activeIds);
  }, [activeIds, hydrated]);

  const filteredAddOptions = allColleges
    .filter(
      (c) =>
        !activeIds.includes(c.id) &&
        (search === "" ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.location.city.toLowerCase().includes(search.toLowerCase()))
    )
    .slice(0, 6);

  if (!hydrated) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  if (colleges.length < 2) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Select colleges to compare"
          description="Add at least 2 colleges to see a side-by-side comparison. You can compare up to 3 colleges."
          action={
            <Link href="/colleges">
              <Button>Browse Colleges</Button>
            </Link>
          }
        />

        {colleges.length === 1 && (
          <p className="mt-4 text-center text-sm text-slate-600">
            1 college selected — add at least one more.
          </p>
        )}

        <div className="mt-8">
          <Button variant="outline" className="w-full" onClick={() => setShowAddPanel(true)}>
            Add College
          </Button>
        </div>

        {showAddPanel && (
          <AddCollegePanel
            search={search}
            setSearch={setSearch}
            options={filteredAddOptions}
            canAdd={canAdd}
            onAdd={(id) => {
              addCollege(id);
              setShowAddPanel(false);
            }}
            onClose={() => setShowAddPanel(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header px-4 py-10 sm:px-6">
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="section-label">Analysis</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Compare Colleges
          </h1>
          <p className="mt-2 text-slate-600">
            Side-by-side comparison of {colleges.length} colleges
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex justify-end gap-2">
          {canAdd && (
            <Button variant="outline" onClick={() => setShowAddPanel(!showAddPanel)}>
              Add College
            </Button>
          )}
          <Button variant="ghost" onClick={clearAll}>
            Clear All
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {colleges.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-800 ring-1 ring-indigo-100"
            >
              {c.name}
              <button
                onClick={() => removeCollege(c.id)}
                className="rounded-full p-0.5 hover:bg-indigo-100"
                aria-label={`Remove ${c.name}`}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>

        {showAddPanel && (
          <AddCollegePanel
            search={search}
            setSearch={setSearch}
            options={filteredAddOptions}
            canAdd={canAdd}
            onAdd={(id) => {
              addCollege(id);
              setShowAddPanel(false);
            }}
            onClose={() => setShowAddPanel(false)}
          />
        )}

        <CompareTable colleges={colleges} />
      </div>
    </div>
  );
}

function AddCollegePanel({
  search,
  setSearch,
  options,
  canAdd,
  onAdd,
  onClose,
}: {
  search: string;
  setSearch: (v: string) => void;
  options: College[];
  canAdd: boolean;
  onAdd: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="card mb-6 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Add a college</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-3">
        <CollegeSearch value={search} onChange={setSearch} placeholder="Search to add..." />
      </div>
      <div className="mt-3 space-y-2">
        {options.map((c) => (
          <button
            key={c.id}
            onClick={() => canAdd && onAdd(c.id)}
            disabled={!canAdd}
            className="flex w-full items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-left text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            <span className="font-medium text-slate-800">{c.name}</span>
            <span className="text-slate-500">{c.location.city}</span>
          </button>
        ))}
        {options.length === 0 && (
          <p className="py-4 text-center text-sm text-slate-500">No colleges found</p>
        )}
      </div>
    </div>
  );
}
