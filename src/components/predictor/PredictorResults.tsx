"use client";

import type { PredictorResult } from "@/types/college";
import { formatCurrency, formatLocation } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface PredictorResultsProps {
  results: PredictorResult[];
  isLoading: boolean;
  hasSearched: boolean;
}

const likelihoodVariant = {
  High: "success" as const,
  Medium: "warning" as const,
  Reach: "info" as const,
};

const likelihoodRing = {
  High: "ring-emerald-200",
  Medium: "ring-amber-200",
  Reach: "ring-indigo-200",
};

export function PredictorResults({ results, isLoading, hasSearched }: PredictorResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50" />
        ))}
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <EmptyState
        title="Enter your rank to get started"
        description="We'll match your rank against historical cutoff data to recommend suitable colleges."
      />
    );
  }

  if (results.length === 0) {
    return (
      <EmptyState
        title="No matching colleges found"
        description="Your rank may be outside the cutoff range for available colleges in this exam. Try a different exam or category."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Found <span className="font-bold text-indigo-600">{results.length}</span> matching colleges
        </p>
      </div>

      {results.map(({ college, matchScore, cutoff, likelihood }) => (
        <article
          key={college.id}
          className={`card overflow-hidden transition-all hover:shadow-lg ring-1 ${likelihoodRing[likelihood]}`}
        >
          <div className="flex flex-col sm:flex-row">
            <div
              className="college-banner relative h-24 w-full shrink-0 sm:h-auto sm:w-28"
              style={{ backgroundColor: college.imageColor }}
            />

            <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-900">{college.name}</h3>
                  <Badge variant={likelihoodVariant[likelihood]}>{likelihood} Match</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {formatLocation(college.location.city, college.location.state)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <Rating value={college.rating} size="sm" showValue reviewCount={college.reviewCount} />
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Cutoff: {cutoff.openingRank}–{cutoff.closingRank}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {formatCurrency(college.fees.annual)}/yr
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <svg className="absolute inset-0 h-16 w-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="url(#scoreGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(matchScore / 100) * 176} 176`}
                    />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center">
                    <p className="text-lg font-extrabold text-indigo-600">{matchScore}%</p>
                  </div>
                </div>
                <Link href={`/colleges/${college.id}`}>
                  <Button variant="outline" size="sm">
                    View College
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
