import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

export async function GET(req: Request, res: Response) {
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

export async function POST(request: Request, res: Response) {
  try {
    const body = await request.json();

    console.log(body);

    const {
      eventName,
      description,
      eventDate,
      street,
      organizer,
      price,
      city,
      pin,
      state,
      country,
      image,
      categories,
      tags,
      capacity,
      speakers,
    } = body;

    const session = await auth();

    const EventCreate = await prisma.event.create({
      data: {
        eventId: session?.user.id || "",
        name: eventName,
        description,
        date: eventDate,
        organizer,
        price,
        city,
        pin,
        state,
        country,
        street,
        categories, // Include the 'categories' property
        speakers, // Include the 'speakers' property
        tags, // Include the 'tags' property
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
    });
  }
}
