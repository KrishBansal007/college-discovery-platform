export type CollegeType = "Government" | "Private" | "Deemed";
export type ExamType = "JEE Main" | "JEE Advanced" | "NEET" | "CAT";

export interface Location {
  city: string;
  state: string;
}

export interface Fees {
  annual: number;
  currency: "INR";
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats: number;
}

export interface PlacementStats {
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ExamCutoff {
  exam: ExamType;
  openingRank: number;
  closingRank: number;
  category: "General" | "OBC" | "SC" | "ST";
}

export interface College {
  id: string;
  name: string;
  slug: string;
  location: Location;
  fees: Fees;
  rating: number;
  reviewCount: number;
  type: CollegeType;
  established: number;
  accreditation: string[];
  overview: string;
  highlights: string[];
  courses: Course[];
  placements: PlacementStats;
  reviews: Review[];
  cutoffs: ExamCutoff[];
  imageColor: string;
}

export interface CollegeFilters {
  search?: string;
  state?: string;
  type?: CollegeType;
  minRating?: number;
  maxFees?: number;
  sortBy?: "rating" | "fees-asc" | "fees-desc" | "name";
}

export interface CollegesResponse {
  colleges: College[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  states: string[];
}

export interface PredictorRequest {
  exam: ExamType;
  rank: number;
  category?: ExamCutoff["category"];
}

export interface PredictorResult {
  college: College;
  matchScore: number;
  cutoff: ExamCutoff;
  likelihood: "High" | "Medium" | "Reach";
}
