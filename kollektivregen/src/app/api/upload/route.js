import { PrismaClient } from "@prisma/client";

export async function POST(req) {
  try {
    const body = await req.json();
    const { quoteid = "speziell", name = "", checkbox = false, url } = body;

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: "Keine Bild-URL empfangen." }),
        { status: 400 }
      );
    }

    const prisma = new PrismaClient();

    const formUpload = await prisma.formUpload.create({
      data: {
        quoteId: quoteid,
        name,
        url,
        checkbox,
      },
    });

    let gallery = await prisma.gallery.findFirst({ where: { quoteId: quoteid } });

    if (!gallery) {
      gallery = await prisma.gallery.create({ data: { quoteId: quoteid } });
    }

    await prisma.uploadEntry.create({
      data: {
        galleryId: gallery.id,
        uploadId: formUpload.id,
        name: formUpload.name,
        url: formUpload.url,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

