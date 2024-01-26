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
  const body = await request.json();

  const { eventName, description, date, location, organizer } = body;

  const EventCreate = await prisma.event.create({
    data: {
      name: eventName,
      description,
      date,
      location,
      organizer,
      createdBy: {}
    },
  });

  return Response.json({
    EventCreate,
    status: 200,
    message: "Event created successfully",
  });
}
