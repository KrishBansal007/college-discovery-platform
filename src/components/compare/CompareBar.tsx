"use client";

import Link from "next/link";
import { useCompare } from "./CompareProvider";
import { Button } from "@/components/ui/Button";

export function CompareBar() {
  const { selectedIds, removeCollege, clearAll } = useCompare();

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-indigo-100 bg-white/90 shadow-[0_-8px_32px_rgba(99,102,241,0.12)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
            {selectedIds.length}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">
              {selectedIds.length} college{selectedIds.length > 1 ? "s" : ""} selected
            </p>
            <p className="hidden text-xs text-slate-500 sm:block">Ready to compare side-by-side</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {selectedIds.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100"
              >
                {id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                <button
                  onClick={() => removeCollege(id)}
                  className="rounded-full p-0.5 transition-colors hover:bg-indigo-100"
                  aria-label={`Remove ${id}`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear
          </Button>
          <Link href={`/compare?ids=${selectedIds.join(",")}`}>
            <Button size="sm" disabled={selectedIds.length < 2}>
              Compare Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
