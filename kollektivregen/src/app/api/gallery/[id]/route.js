import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: id }, // Wichtig: ID ist vom Typ String, NICHT parseInt!
      include: { uploads: true, quote: true }, // Include related uploads and quote
    });

    if (!gallery) {
      return NextResponse.json({ error: "Galerie nicht gefunden" }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Fehler beim Abrufen der Galerie:", error);
    return NextResponse.json({ error: "Fehler beim Abrufen der Galerie" }, { status: 500 });
  }
}
