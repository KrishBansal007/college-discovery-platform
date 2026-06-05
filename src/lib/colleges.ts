import { colleges } from "@/data/colleges";
import type {
  College,
  CollegeFilters,
  CollegesResponse,
  ExamCutoff,
  ExamType,
  PredictorRequest,
  PredictorResult,
} from "@/types/college";

const DEFAULT_PAGE_SIZE = 6;

export function getAllStates(): string[] {
  const states = new Set(colleges.map((c) => c.location.state));
  return Array.from(states).sort();
}

export function getCollegeById(id: string): College | undefined {
  return colleges.find((c) => c.id === id || c.slug === id);
}

export function filterColleges(filters: CollegeFilters): College[] {
  let result = [...colleges];

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.location.city.toLowerCase().includes(q) ||
        c.location.state.toLowerCase().includes(q) ||
        c.courses.some((course) => course.name.toLowerCase().includes(q))
    );
  }

  if (filters.state) {
    result = result.filter((c) => c.location.state === filters.state);
  }

  if (filters.type) {
    result = result.filter((c) => c.type === filters.type);
  }

  if (filters.minRating !== undefined && filters.minRating > 0) {
    result = result.filter((c) => c.rating >= filters.minRating!);
  }

  if (filters.maxFees !== undefined && filters.maxFees > 0) {
    result = result.filter((c) => c.fees.annual <= filters.maxFees!);
  }

  switch (filters.sortBy) {
    case "fees-asc":
      result.sort((a, b) => a.fees.annual - b.fees.annual);
      break;
    case "fees-desc":
      result.sort((a, b) => b.fees.annual - a.fees.annual);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rating":
    default:
      result.sort((a, b) => b.rating - a.rating);
      break;
  }

  return result;
}

export function paginateColleges(
  filtered: College[],
  page: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): CollegesResponse {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    colleges: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize,
    hasMore: end < filtered.length,
    states: getAllStates(),
  };
}

export function searchColleges(
  filters: CollegeFilters,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): CollegesResponse {
  const filtered = filterColleges(filters);
  return paginateColleges(filtered, page, pageSize);
}

function getLikelihood(
  rank: number,
  cutoff: ExamCutoff
): { likelihood: PredictorResult["likelihood"]; matchScore: number } {
  const { openingRank, closingRank } = cutoff;

  if (rank <= openingRank) {
    return { likelihood: "High", matchScore: 95 };
  }
  if (rank <= closingRank) {
    const range = closingRank - openingRank || 1;
    const position = rank - openingRank;
    const score = Math.round(90 - (position / range) * 40);
    return { likelihood: "Medium", matchScore: Math.max(50, score) };
  }
  const overshoot = rank - closingRank;
  if (overshoot <= closingRank * 0.2) {
    return { likelihood: "Reach", matchScore: Math.max(20, 40 - Math.round(overshoot / 100)) };
  }
  return { likelihood: "Reach", matchScore: 10 };
}

export function predictColleges(request: PredictorRequest): PredictorResult[] {
  const { exam, rank, category = "General" } = request;

  if (rank <= 0) return [];

  const results: PredictorResult[] = [];

  for (const college of colleges) {
    const cutoff = college.cutoffs.find(
      (c) => c.exam === exam && c.category === category
    );
    if (!cutoff) continue;

    if (rank > cutoff.closingRank * 1.5) continue;

    const { likelihood, matchScore } = getLikelihood(rank, cutoff);

    results.push({ college, matchScore, cutoff, likelihood });
  }

  return results.sort((a, b) => b.matchScore - a.matchScore);
}

export function getCollegesByIds(ids: string[]): College[] {
  return ids
    .map((id) => getCollegeById(id))
    .filter((c): c is College => c !== undefined);
}

export function getAvailableExams(): ExamType[] {
  const exams = new Set<ExamType>();
  colleges.forEach((c) => c.cutoffs.forEach((co) => exams.add(co.exam)));
  return Array.from(exams);
}
