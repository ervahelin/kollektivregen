import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    const quoteid = formData.get("quoteid");
    const name = formData.get("name");
    const checkbox = formData.get("checkbox") === "true";
    const file = formData.get("image");

    // Validation
    if (!quoteid || !file || typeof file !== "object") {
      return new Response(
        JSON.stringify({ success: false, error: "Missing or invalid data." }),
        { status: 400 }
      );
    }

    // Prepare form data for Cloudflare
    const uploadForm = new FormData();
    uploadForm.set("file", file);
    uploadForm.set("id", `upload-${uuidv4()}`);

    const uploadRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: uploadForm,
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadData.success) {
      console.error("Cloudflare upload failed:", uploadData);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Upload zu Cloudflare fehlgeschlagen.",
        }),
        { status: 500 }
      );
    }

    const cloudflareUrl = uploadData.result.variants[0];

    // Save form upload
    const formUpload = await prisma.formUpload.create({
      data: {
        quoteId: quoteid,
        name: name || "",
        url: cloudflareUrl,
        checkbox,
      },
    });

    // Check for existing gallery
    let gallery = await prisma.gallery.findFirst({
      where: { quoteId: quoteid },
    });

    if (!gallery) {
      gallery = await prisma.gallery.create({
        data: { quoteId: quoteid },
      });
    }

    // Save upload entry to gallery
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
    console.error("Fehler beim Upload:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
