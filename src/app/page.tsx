import Link from "next/link";
import { colleges } from "@/data/colleges";
import { formatCurrency } from "@/lib/format";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";

export const unstable_instant = {
  prefetch: "static",
  unstable_disableValidation: true,
};

const features = [
  {
    title: "Smart Search & Filters",
    description:
      "Search by name, city, or course. Filter by state, type, fees, and rating with infinite scroll.",
    href: "/colleges",
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    ),
  },
  {
    title: "Detailed Profiles",
    description:
      "Explore courses, placements, reviews, and cutoffs for each college in depth.",
    href: "/colleges/iit-bombay",
    gradient: "from-violet-500 to-purple-600",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
  },
  {
    title: "Side-by-Side Compare",
    description: "Compare up to 3 colleges on fees, placements, ratings, and more.",
    href: "/compare",
    gradient: "from-indigo-500 to-blue-600",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    ),
  },
  {
    title: "Rank Predictor",
    description:
      "Enter your exam rank and get data-driven college recommendations with match scores.",
    href: "/predictor",
    gradient: "from-emerald-500 to-teal-600",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    ),
  },
];

const topColleges = colleges.slice(0, 4);
const stats = [
  { value: `${colleges.length}+`, label: "Colleges" },
  { value: "4", label: "Entrance Exams" },
  { value: "100%", label: "Free to Use" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28" style={{ background: "var(--gradient-hero)" }}>
        <div className="pattern-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            India&apos;s college discovery platform
          </div>

          <h1 className="animate-fade-up stagger-1 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            Find the college
            <br />
            <span className="text-indigo-100">
              made for you
            </span>
          </h1>

          <p className="animate-fade-up stagger-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-indigo-100/90 sm:text-lg">
            Search 20+ top institutes, compare side-by-side, and predict your admission
            chances — all in one beautiful platform.
          </p>

          <div className="animate-fade-up stagger-3 mx-auto mt-10 max-w-2xl">
            <HomeSearch />
          </div>

          <div className="animate-fade-up stagger-4 mt-12 flex flex-wrap items-center justify-center gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-indigo-200/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="section-label justify-center">Features</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to decide
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Four powerful tools designed to make your college search effortless and informed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="card card-lift group relative overflow-hidden p-6"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                Explore
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Colleges */}
      <section className="border-t border-slate-200/60 bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-label">Top picks</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Highest Rated Colleges
              </h2>
            </div>
            <Link
              href="/colleges"
              className="hidden items-center gap-1 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-100 sm:flex"
            >
              View all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topColleges.map((college, index) => (
              <Link
                key={college.id}
                href={`/colleges/${college.id}`}
                className="card card-lift group overflow-hidden"
              >
                <div className="college-banner relative h-28" style={{ backgroundColor: college.imageColor }}>
                  <div className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm font-extrabold text-slate-800 shadow">
                    #{index + 1}
                  </div>
                  <Badge className="absolute bottom-3 left-4 z-10 bg-white/90 text-slate-700 backdrop-blur-sm">
                    {college.type}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {college.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500">
                    {college.location.city}, {college.location.state}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <Rating value={college.rating} size="sm" showValue={false} />
                    <span className="text-sm font-bold text-slate-800">
                      {formatCurrency(college.fees.annual)}
                      <span className="font-normal text-slate-400">/yr</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/colleges" className="btn-gradient inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white">
              View All Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16" style={{ background: "var(--gradient-hero)" }}>
          <div className="pattern-dots pointer-events-none absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Not sure which college fits your rank?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-indigo-100/90">
              Use our predictor tool to get personalized recommendations based on historical cutoff data.
            </p>
            <Link
              href="/predictor"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-700 shadow-xl transition-transform hover:scale-105"
            >
              Try College Predictor
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeSearch() {
  return (
    <form action="/colleges" method="get" className="relative">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-400/30 to-violet-400/30 blur-lg" />
      <div className="relative flex overflow-hidden rounded-2xl bg-white shadow-2xl shadow-indigo-900/20">
        <svg
          className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          name="search"
          placeholder="Search colleges, cities, courses..."
          className="flex-1 bg-transparent py-4 pl-14 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none sm:py-5"
        />
        <button
          type="submit"
          className="m-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl sm:px-8"
        >
          Search
        </button>
      </div>
    </form>
  );
}
