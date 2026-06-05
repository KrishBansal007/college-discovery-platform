interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "danger";
  className?: string;
}

const variants = {
  default: "bg-slate-100 text-slate-700 ring-1 ring-slate-200/60",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60",
  warning: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/60",
  info: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/60",
  danger: "bg-red-50 text-red-700 ring-1 ring-red-200/60",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
