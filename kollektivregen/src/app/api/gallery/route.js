import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      select: {
        id: true,
        quoteId: true,
        uploads: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });

    if (!galleries || galleries.length === 0) {
      return NextResponse.json({ error: "No galleries found" }, { status: 404 });
    }

    return NextResponse.json(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json({ error: "Failed to fetch galleries" }, { status: 500 });
  }
}
