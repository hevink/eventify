import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { event: string } }) {
  console.log(params);

  try {
    const event = await db.event.findUnique({
      where: {
        id: params.event,
      },
    });
    return NextResponse.json({
      status: 200,
      event,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
