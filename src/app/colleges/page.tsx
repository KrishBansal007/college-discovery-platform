import { Suspense } from "react";
import { CollegesPageClient } from "./CollegesPageClient";

export const metadata = {
  title: "Explore Colleges — EduFind",
  description: "Search and filter top colleges across India with ratings, fees, and placement data.",
};

export const unstable_instant = {
  prefetch: "static",
  unstable_disableValidation: true,
};

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    }>
      <CollegesPageClient />
    </Suspense>
  );
}
