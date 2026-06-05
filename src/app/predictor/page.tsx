import { PredictorPageClient } from "./PredictorPageClient";

export const metadata = {
  title: "College Predictor — EduFind",
  description:
    "Enter your entrance exam rank to get data-driven college recommendations with match scores.",
};

export const unstable_instant = { prefetch: "static" };

export default function PredictorPage() {
  return <PredictorPageClient />;
}
