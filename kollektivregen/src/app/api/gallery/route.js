import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Import NextResponse

const prisma = new PrismaClient();

// Named export for GET method
export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      select: {
        id: true,  
        uploads: true,
        quoteId: true,
      },
    });

    if (!galleries || galleries.length === 0) {
      return NextResponse.json({ error: "No quotes found" }, { status: 404 });
    }
    return NextResponse.json(galleries);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
