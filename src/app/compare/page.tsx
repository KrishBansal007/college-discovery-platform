import { Suspense } from "react";
import { ComparePageClient } from "./ComparePageClient";

export const metadata = {
  title: "Compare Colleges — EduFind",
  description: "Compare up to 3 colleges side-by-side on fees, placements, ratings, and more.",
};

export const unstable_instant = {
  prefetch: "static",
  unstable_disableValidation: true,
};

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    }>
      <ComparePageClient />
    </Suspense>
  );
}
