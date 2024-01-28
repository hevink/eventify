import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request, res: Response) {
  const events = await prisma.event.findMany({});
  return NextResponse.json({
    status: 200,
    events,
  });
}

export async function POST(request: Request, res: Response) {
  try {
    const body = await request.json();

    const { eventName, description, eventDate, location, organizer } = body;

    const EventCreate = await prisma.event.create({
      data: {
        eventId: "3",
        name: eventName,
        description,
        date: eventDate,
        location,
        organizer,
        createdBy: { connect: { id: "1" } }, 
      },
    });

    return NextResponse.json({
      EventCreate,
      status: 200,
      message: "Event created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      error,
      status: 400,
      message: "Something Went Wrong",
    });
  }
}
