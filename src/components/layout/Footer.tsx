import Link from "next/link";

const links = [
  { href: "/colleges", label: "Explore Colleges" },
  { href: "/compare", label: "Compare" },
  { href: "/predictor", label: "Rank Predictor" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                Edu<span className="gradient-text">Find</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Your trusted platform to discover, compare, and predict college admissions across India.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Platform</h4>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Coverage</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-500">
              <li>20+ Top Colleges</li>
              <li>JEE, NEET, CAT Exams</li>
              <li>Placement & Fee Data</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © 2026 EduFind. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">Made with Next.js · TypeScript · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
