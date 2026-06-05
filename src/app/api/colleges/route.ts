import { searchColleges } from "@/lib/colleges";
import type { CollegeFilters, CollegeType } from "@/types/college";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const filters: CollegeFilters = {
    search: searchParams.get("search") || undefined,
    state: searchParams.get("state") || undefined,
    type: (searchParams.get("type") as CollegeType) || undefined,
    minRating: searchParams.get("minRating")
      ? Number(searchParams.get("minRating"))
      : undefined,
    maxFees: searchParams.get("maxFees")
      ? Number(searchParams.get("maxFees"))
      : undefined,
    sortBy: (searchParams.get("sortBy") as CollegeFilters["sortBy"]) || "rating",
  };

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(20, Math.max(1, Number(searchParams.get("pageSize")) || 6));

  const result = searchColleges(filters, page, pageSize);

  return NextResponse.json(result);
}
