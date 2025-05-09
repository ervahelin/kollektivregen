import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'; // Import NextResponse

const prisma = new PrismaClient();

// Named export for GET method
export async function GET() {
  try {
    // Fetch all quotes from the database
    const quotes = await prisma.quote.findMany({
      select: {
        id: true,
        text: true,
        text_formatted: true, // Select only the fields you need
      },
    });

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ error: "No quotes found" }, { status: 404 });
    }

    // Respond with the quotes in JSON format
    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
