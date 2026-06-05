"use client";

import type { College } from "@/types/college";
import { formatCurrency, formatLocation } from "@/lib/format";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

interface CompareTableProps {
  colleges: College[];
}

interface Row {
  label: string;
  render: (college: College) => React.ReactNode;
}

const rows: Row[] = [
  {
    label: "Location",
    render: (c) => formatLocation(c.location.city, c.location.state),
  },
  {
    label: "Type",
    render: (c) => <Badge variant="info">{c.type}</Badge>,
  },
  {
    label: "Established",
    render: (c) => <span className="font-semibold">{c.established}</span>,
  },
  {
    label: "Rating",
    render: (c) => <Rating value={c.rating} reviewCount={c.reviewCount} size="sm" />,
  },
  {
    label: "Annual Fees",
    render: (c) => (
      <span className="text-base font-bold text-slate-900">{formatCurrency(c.fees.annual)}</span>
    ),
  },
  {
    label: "Avg. Package",
    render: (c) => (
      <span className="text-base font-bold text-emerald-600">
        {formatCurrency(c.placements.averagePackage)}
      </span>
    ),
  },
  {
    label: "Highest Package",
    render: (c) => formatCurrency(c.placements.highestPackage),
  },
  {
    label: "Placement Rate",
    render: (c) => (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700 ring-1 ring-amber-100">
        {c.placements.placementRate}%
      </span>
    ),
  },
  {
    label: "Top Recruiters",
    render: (c) => (
      <div className="flex flex-wrap gap-1.5">
        {c.placements.topRecruiters.slice(0, 3).map((r) => (
          <Badge key={r} variant="info">
            {r}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    label: "Courses",
    render: (c) => (
      <ul className="space-y-1 text-sm">
        {c.courses.slice(0, 2).map((course) => (
          <li key={course.id} className="font-medium text-slate-700">
            {course.name}
          </li>
        ))}
        {c.courses.length > 2 && (
          <li className="text-xs font-medium text-indigo-500">+{c.courses.length - 2} more</li>
        )}
      </ul>
    ),
  },
];

export function CompareTable({ colleges }: CompareTableProps) {
  return (
    <div className="card overflow-hidden">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30">
            <th className="sticky left-0 z-10 bg-slate-50 px-5 py-5 text-xs font-bold uppercase tracking-widest text-slate-400">
              Criteria
            </th>
            {colleges.map((college) => (
              <th key={college.id} className="min-w-[220px] px-5 py-5">
                <div className="college-banner relative mb-4 h-20 overflow-hidden rounded-xl" style={{ backgroundColor: college.imageColor }} />
                <Link
                  href={`/colleges/${college.id}`}
                  className="font-bold text-slate-900 transition-colors hover:text-indigo-600"
                >
                  {college.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={row.label}
              className={`border-b border-slate-50 transition-colors hover:bg-indigo-50/20 ${rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
            >
              <td className="sticky left-0 z-10 bg-inherit px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                {row.label}
              </td>
              {colleges.map((college) => (
                <td key={college.id} className="px-5 py-4 text-slate-700">
                  {row.render(college)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
