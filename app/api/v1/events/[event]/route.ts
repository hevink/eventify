import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { event: string } }
) {
  try {
    const body = await request.json();

    const updateEvent = db.event.update({
      where: {
        id: params.event,
      },
      data: {
        ...body,
      },
    });

    return NextResponse.json({
      updateEvent,
      status: 200,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({
      error: "An error occurred",
      status: 500,
    });
  }
}
