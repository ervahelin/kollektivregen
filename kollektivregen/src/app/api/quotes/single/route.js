import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const currentDate = new Date();
    const currentWeek = Math.floor((currentDate - new Date('2025-05-09')) / (1000 * 60 * 60 * 24 * 7));

    // Hole das Zitat für die aktuelle Woche
    const quote = await prisma.quote.findFirst({
      where: {
        week: currentWeek, // Angenommen, du hast ein Feld 'week' in der Datenbank
      },
      select: {
        id: true,
        text: true,
        text_formatted: true,
      },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}
