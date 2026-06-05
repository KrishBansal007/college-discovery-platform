"use client";

import Link from "next/link";
import type { College } from "@/types/college";
import { formatCurrency, formatLocation } from "@/lib/format";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCompare } from "@/components/compare/CompareProvider";
import { useState } from "react";

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { isSelected, addCollege, removeCollege, canAdd } = useCompare();
  const [toast, setToast] = useState<string | null>(null);
  const selected = isSelected(college.id);

  const handleCompare = () => {
    if (selected) {
      removeCollege(college.id);
      return;
    }
    if (!canAdd) {
      setToast("Max 3 colleges for comparison");
      setTimeout(() => setToast(null), 2500);
      return;
    }
    addCollege(college.id);
  };

  return (
    <article className="card card-lift group relative flex flex-col overflow-hidden">
      {toast && (
        <div className="absolute right-3 top-3 z-20 rounded-xl bg-slate-900/90 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-sm">
          {toast}
        </div>
      )}

      <div className="college-banner relative h-32" style={{ backgroundColor: college.imageColor }}>
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-4">
          <Badge className="bg-white/95 text-slate-700 shadow-sm backdrop-blur-sm">
            {college.type}
          </Badge>
          <span className="rounded-lg bg-black/30 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Est. {college.established}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/colleges/${college.id}`} className="group/link">
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 transition-colors group-hover/link:text-indigo-600">
            {college.name}
          </h3>
        </Link>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {formatLocation(college.location.city, college.location.state)}
        </p>

        <div className="mt-3">
          <Rating value={college.rating} reviewCount={college.reviewCount} size="sm" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 px-3 py-2.5 ring-1 ring-slate-100">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Fees</p>
            <p className="mt-0.5 text-sm font-bold text-slate-800">
              {formatCurrency(college.fees.annual)}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2.5 ring-1 ring-emerald-100">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500">Package</p>
            <p className="mt-0.5 text-sm font-bold text-emerald-700">
              {formatCurrency(college.placements.averagePackage)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <Link href={`/colleges/${college.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            variant={selected ? "primary" : "outline"}
            size="sm"
            onClick={handleCompare}
          >
            {selected ? "✓ Added" : "+ Compare"}
          </Button>
        </div>
      </div>
    </article>
  );
}
