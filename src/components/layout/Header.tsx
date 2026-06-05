"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "@/components/compare/CompareProvider";

const navLinks = [
  { href: "/colleges", label: "Explore" },
  { href: "/compare", label: "Compare" },
  { href: "/predictor", label: "Predictor" },
];

export function Header() {
  const pathname = usePathname();
  const { selectedIds } = useCompare();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824 2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Edu<span className="gradient-text">Find</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-500 sm:block">
              College Discovery
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-2xl bg-slate-100/80 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
                {link.href === "/compare" && selectedIds.length > 0 && (
                  <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-1.5 text-[10px] font-bold text-white">
                    {selectedIds.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/predictor"
            className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:block"
          >
            Predict Rank
          </Link>
          <Link
            href="/colleges"
            className="btn-gradient rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
          >
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}
