import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received body:', body);  // Log the body to inspect quoteid

    const { quoteid, name, url, checkbox } = body;

    if (!quoteid) {
      return new Response(
        JSON.stringify({ success: false, error: 'quoteid is required' }),
        { status: 400 }
      );
    }

    // 1. Eintrag in FormUpload erstellen
    const formUpload = await prisma.formUpload.create({
      data: {
        quoteId: quoteid,
        name: name || '',
        url,
        checkbox
      },
    });

    // 2. Nach existierender Gallery mit dieser quoteId suchen
    let gallery = await prisma.gallery.findFirst({
      where: {
        quoteId: quoteid,
      },
    });

    // 3. Falls keine Gallery existiert, erstelle eine neue
    if (!gallery) {
      gallery = await prisma.gallery.create({
        data: {
          quoteId: quoteid,
        },
      });
    }

    // 4. UploadEntry in die Gallery einfügen
    await prisma.uploadEntry.create({
      data: {
        galleryId: gallery.id,
        uploadId: formUpload.id,
        name: formUpload.name,
        url: formUpload.url,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Fehler beim Upload:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

