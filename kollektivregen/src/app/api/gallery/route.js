import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0', 10); 
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const skip = page * limit;

    const galleries = await prisma.gallery.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        quoteId: true,
        uploads: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return NextResponse.json(galleries);
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json({ error: "Failed to fetch galleries" }, { status: 500 });
  }
}
