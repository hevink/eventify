import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request, res: Response) {
  return NextResponse.json({
    status: 200,
  });
}
