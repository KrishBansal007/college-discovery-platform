"use client";

import { useCompare } from "@/components/compare/CompareProvider";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";

interface CollegeDetailActionsProps {
  collegeId: string;
  collegeName: string;
}

export function CollegeDetailActions({ collegeId, collegeName }: CollegeDetailActionsProps) {
  const { isSelected, addCollege, removeCollege, canAdd, selectedIds } = useCompare();
  const [message, setMessage] = useState<string | null>(null);
  const selected = isSelected(collegeId);

  const handleCompare = () => {
    if (selected) {
      removeCollege(collegeId);
      return;
    }
    if (!canAdd) {
      setMessage("You can compare up to 3 colleges. Remove one to add this.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    addCollege(collegeId);
    setMessage(`Added ${collegeName} to comparison`);
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className="card p-5">
      {message && (
        <p className="mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700">
          {message}
        </p>
      )}
      <Button
        className="w-full"
        variant={selected ? "secondary" : "primary"}
        onClick={handleCompare}
      >
        {selected ? "Remove from Compare" : "Add to Compare"}
      </Button>
      {selectedIds.length >= 2 && (
        <Link href={`/compare?ids=${selectedIds.join(",")}`} className="mt-2 block">
          <Button variant="outline" className="w-full">
            Go to Comparison ({selectedIds.length})
          </Button>
        </Link>
      )}
      <Link href="/colleges" className="mt-2 block">
        <Button variant="ghost" className="w-full">
          ← Back to Explore
        </Button>
      </Link>
    </div>
  );
}
