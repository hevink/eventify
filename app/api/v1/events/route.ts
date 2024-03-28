import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET() {
  try {
    const events = await prisma.event.findMany({});
    return NextResponse.json({
      status: 200,
      events,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const session = await auth();

    const userId = session?.user.id || "";

    const EventCreate = await prisma.event.create({
      data: {
        eventId: userId,
        ...body,
        isFree: false,
      },
    });

    return NextResponse.json({
      EventCreate,
      status: 200,
      message: "Event created successfully",
    });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}

export async function DELETE(id: string) {
  try {
    const event = await prisma.event.delete({
      where: {
        id: id,
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
