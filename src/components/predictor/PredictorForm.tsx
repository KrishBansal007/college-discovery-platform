"use client";

import type { ExamType } from "@/types/college";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface PredictorFormProps {
  exam: ExamType;
  rank: string;
  category: string;
  isLoading: boolean;
  onExamChange: (exam: ExamType) => void;
  onRankChange: (rank: string) => void;
  onCategoryChange: (category: string) => void;
  onSubmit: () => void;
}

const examOptions = [
  { value: "JEE Main", label: "JEE Main" },
  { value: "JEE Advanced", label: "JEE Advanced" },
  { value: "NEET", label: "NEET" },
  { value: "CAT", label: "CAT" },
];

const categoryOptions = [
  { value: "General", label: "General" },
  { value: "OBC", label: "OBC" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
];

export function PredictorForm({
  exam,
  rank,
  category,
  isLoading,
  onExamChange,
  onRankChange,
  onCategoryChange,
  onSubmit,
}: PredictorFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="card sticky top-24 space-y-5 p-6 sm:p-7">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-5 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-bold">College Predictor</h2>
        <p className="mt-1 text-sm text-indigo-100">
          Match your rank against historical cutoff data.
        </p>
      </div>

      <Select
        label="Entrance Exam"
        value={exam}
        onChange={(e) => onExamChange(e.target.value as ExamType)}
        options={examOptions}
      />

      <Input
        label="Your Rank"
        type="number"
        min={1}
        placeholder="e.g. 5000"
        value={rank}
        onChange={(e) => onRankChange(e.target.value)}
        required
      />

      <Select
        label="Category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        options={categoryOptions}
      />

      <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={!rank}>
        Predict Colleges
      </Button>
    </form>
  );
}
