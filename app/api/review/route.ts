import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await db.review.create({
      data: {
        ...body,
      },
    });

    console.log(body);

    return NextResponse.json({
      status: 200,
      response,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const reviews = await db.review.findMany({});
    return NextResponse.json({
      status: 200,
      reviews,
    });
  } catch (error) {
    return NextResponse.json({
      error,
      status: 500,
    });
  }
}
