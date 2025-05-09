import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Einen zufälligen Quote holen
    const quotes = await prisma.quote.findMany({
      select: {
        id: true,
        text: true,
        text_formatted: true,
      },
    });

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ error: "No quotes found" }, { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    return NextResponse.json(randomQuote);
  } catch (error) {
    console.error("Error fetching single quote:", error);
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}
