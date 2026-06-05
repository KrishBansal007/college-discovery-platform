import { getCollegeById } from "@/lib/colleges";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate, formatLocation, formatPackage } from "@/lib/format";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { CollegeDetailActions } from "./CollegeDetailActions";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const college = getCollegeById(id);
  if (!college) return { title: "College Not Found" };
  return {
    title: `${college.name} — EduFind`,
    description: college.overview.slice(0, 160),
  };
}

export const unstable_instant = { prefetch: "static" };

export default async function CollegeDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    }>
      {params.then(({ id }) => (
        <CollegeDetailContent id={id} />
      ))}
    </Suspense>
  );
}

function CollegeDetailContent({ id }: { id: string }) {
  const college = getCollegeById(id);

  if (!college) notFound();

  return (
    <div>
      {/* Header banner */}
      <div className="relative overflow-hidden px-4 sm:px-6" style={{ backgroundColor: college.imageColor }}>
        <div className="college-banner absolute inset-0" style={{ backgroundColor: college.imageColor }} />
        <div className="pattern-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="!bg-white/25 !text-white !ring-0 backdrop-blur-sm">{college.type}</Badge>
            <Badge className="!bg-white/25 !text-white !ring-0 backdrop-blur-sm">Est. {college.established}</Badge>
            {college.accreditation.map((acc) => (
              <Badge key={acc} className="!bg-white/25 !text-white !ring-0 backdrop-blur-sm">
                {acc}
              </Badge>
            ))}
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            {college.name}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-base text-white/80">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {formatLocation(college.location.city, college.location.state)}
          </p>
          <div className="mt-5 inline-block rounded-2xl bg-black/20 p-4 backdrop-blur-sm">
            <Rating value={college.rating} reviewCount={college.reviewCount} size="lg" variant="light" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="min-w-0 flex-1 space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Annual Fees", value: formatCurrency(college.fees.annual), color: "text-slate-900", bg: "bg-slate-50 ring-slate-100" },
                { label: "Avg. Package", value: formatPackage(college.placements.averagePackage), color: "text-emerald-700", bg: "bg-emerald-50 ring-emerald-100" },
                { label: "Placement Rate", value: `${college.placements.placementRate}%`, color: "text-amber-700", bg: "bg-amber-50 ring-amber-100" },
                { label: "Highest Package", value: formatCurrency(college.placements.highestPackage), color: "text-indigo-700", bg: "bg-indigo-50 ring-indigo-100" },
              ].map((stat) => (
                <div key={stat.label} className={`stat-card text-center ring-1 ${stat.bg}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <p className={`mt-2 text-xl font-extrabold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Overview */}
            <section className="card p-6 sm:p-8">
              <p className="section-label">About</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Overview</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{college.overview}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {college.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-800"
                  >
                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* Courses */}
            <section className="card p-6 sm:p-8">
              <p className="section-label">Academics</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Courses Offered</h2>
              <div className="mt-5 overflow-x-auto rounded-xl ring-1 ring-slate-100">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-slate-500">
                      <th className="pb-3 font-medium">Course</th>
                      <th className="pb-3 font-medium">Duration</th>
                      <th className="pb-3 font-medium">Fees/yr</th>
                      <th className="pb-3 font-medium">Seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.courses.map((course) => (
                      <tr key={course.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 font-medium text-slate-800">{course.name}</td>
                        <td className="py-3 text-slate-600">{course.duration}</td>
                        <td className="py-3 text-slate-600">{formatCurrency(course.fees)}</td>
                        <td className="py-3 text-slate-600">{course.seats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Placements */}
            <section className="card p-6 sm:p-8">
              <p className="section-label">Career</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Placements</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-5 ring-1 ring-emerald-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Average Package</p>
                  <p className="mt-2 text-2xl font-extrabold text-emerald-900">
                    {formatCurrency(college.placements.averagePackage)}
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5 ring-1 ring-indigo-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">Highest Package</p>
                  <p className="mt-2 text-2xl font-extrabold text-indigo-900">
                    {formatCurrency(college.placements.highestPackage)}
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-5 ring-1 ring-amber-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Placement Rate</p>
                  <p className="mt-2 text-2xl font-extrabold text-amber-900">
                    {college.placements.placementRate}%
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700">Top Recruiters</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map((r) => (
                    <Badge key={r} variant="info">
                      {r}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="card p-6 sm:p-8">
              <p className="section-label">Community</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Student Reviews ({college.reviews.length})
              </h2>
              <div className="mt-5 space-y-4">
                {college.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-800">{review.author}</p>
                      <span className="text-xs text-slate-400">{formatDate(review.date)}</span>
                    </div>
                    <div className="mt-1">
                      <Rating value={review.rating} size="sm" showValue={false} />
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-24 space-y-4">
              <CollegeDetailActions collegeId={college.id} collegeName={college.name} />

              {college.cutoffs.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-bold text-slate-900">Cutoff Ranks</h3>
                  <div className="mt-4 space-y-2">
                    {college.cutoffs.map((c, i) => (
                      <div key={i} className="rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3 text-sm ring-1 ring-indigo-100">
                        <p className="font-medium text-slate-800">{c.exam}</p>
                        <p className="text-slate-500">
                          {c.category}: {c.openingRank}–{c.closingRank}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/predictor"
                    className="mt-4 block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Check your chances →
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

