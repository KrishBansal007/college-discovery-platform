"use client";

import type { College } from "@/types/college";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const MAX_COMPARE = 3;
const STORAGE_KEY = "college-compare-ids";

interface CompareContextValue {
  selectedIds: string[];
  addCollege: (id: string) => boolean;
  removeCollege: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
  canAdd: boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (Array.isArray(parsed)) {
          setSelectedIds(parsed.slice(0, MAX_COMPARE));
        }
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds, hydrated]);

  const addCollege = useCallback((id: string) => {
    let added = false;
    setSelectedIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);

  const removeCollege = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const value = useMemo(
    () => ({
      selectedIds,
      addCollege,
      removeCollege,
      clearAll,
      isSelected,
      canAdd: selectedIds.length < MAX_COMPARE,
      isFull: selectedIds.length >= MAX_COMPARE,
    }),
    [selectedIds, addCollege, removeCollege, clearAll, isSelected]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

export { MAX_COMPARE };
