"use client";

import { useEffect, useState } from "react";
import type { ExamType, PredictorResult } from "@/types/college";
import { predictColleges } from "@/lib/colleges";
import { PredictorForm } from "@/components/predictor/PredictorForm";
import { PredictorResults } from "@/components/predictor/PredictorResults";

export function PredictorPageClient() {
  const [exam, setExam] = useState<ExamType>("JEE Main");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("General");
  const [results, setResults] = useState<PredictorResult[]>([]);
  const isLoading = false;
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatically calculate results on input/selection change to prevent "freezing" UI
  useEffect(() => {
    const rankNum = Number(rank);
    if (!rank || isNaN(rankNum) || rankNum <= 0) {
      setError(rank ? "Please enter a valid rank" : null);
      setResults([]);
      setHasSearched(false);
      return;
    }

    setError(null);
    setHasSearched(true);

    const res = predictColleges({
      exam,
      rank: rankNum,
      category: category as "General" | "OBC" | "SC" | "ST",
    });

    setResults(res);
  }, [exam, rank, category]);

  const handleSubmit = () => {
    // Already handled reactively by useEffect
  };

  return (
    <div>
      <div className="page-header px-4 py-10 sm:px-6">
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="section-label justify-center">AI-Powered</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            College Predictor
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Enter your entrance exam rank to discover colleges where you have a strong chance of
            admission.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <PredictorForm
            exam={exam}
            rank={rank}
            category={category}
            isLoading={isLoading}
            onExamChange={setExam}
            onRankChange={setRank}
            onCategoryChange={setCategory}
            onSubmit={handleSubmit}
          />

          <div>
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
            <PredictorResults results={results} isLoading={isLoading} hasSearched={hasSearched} />
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl ring-1 ring-amber-200">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3">
            <h3 className="font-bold text-white">How it works</h3>
          </div>
          <ul className="space-y-2 bg-gradient-to-b from-amber-50 to-white px-6 py-5 text-sm text-amber-900/80">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              Match scores are calculated based on your rank vs. historical opening/closing ranks
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <strong>High</strong> — rank within opening rank (very likely)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <strong>Medium</strong> — rank between opening and closing rank
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <strong>Reach</strong> — rank slightly above closing rank (competitive)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
