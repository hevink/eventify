import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const session = await auth();

    const myEvents = await db.event.findMany({
      where: {
        eventId: session?.user.id || "",
      },
    });

    return NextResponse.json(myEvents);
  } catch (error) {
    return NextResponse.json({ error, status: 400 });
  }
}

