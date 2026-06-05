import { predictColleges } from "@/lib/colleges";
import type { ExamType, PredictorRequest } from "@/types/college";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PredictorRequest;

    if (!body.exam || !body.rank) {
      return NextResponse.json(
        { error: "Exam and rank are required" },
        { status: 400 }
      );
    }

    const validExams: ExamType[] = ["JEE Main", "JEE Advanced", "NEET", "CAT"];
    if (!validExams.includes(body.exam)) {
      return NextResponse.json({ error: "Invalid exam type" }, { status: 400 });
    }

    if (body.rank <= 0 || !Number.isFinite(body.rank)) {
      return NextResponse.json({ error: "Rank must be a positive number" }, { status: 400 });
    }

    const results = predictColleges(body);

    return NextResponse.json({
      results,
      total: results.length,
      query: body,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
