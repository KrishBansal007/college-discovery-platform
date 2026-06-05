interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  variant?: "default" | "light";
}

const sizes = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = true,
  reviewCount,
  variant = "default",
}: RatingProps) {
  const isLight = variant === "light";
  const emptyStarColor = isLight ? "text-white/30" : "text-slate-200";
  const valueColor = isLight ? "text-white" : "text-slate-900";
  const countColor = isLight ? "text-white/70" : "text-slate-500";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${value} out of ${max}`}>
        {Array.from({ length: max }, (_, i) => {
          const filled = i < Math.floor(value);
          const partial = !filled && i < value;
          return (
            <svg
              key={i}
              className={`${sizes[size]} ${filled || partial ? "text-amber-400" : emptyStarColor}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
      {showValue && (
        <span className={`text-sm font-semibold ${valueColor}`}>{value.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className={`text-sm ${countColor}`}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
