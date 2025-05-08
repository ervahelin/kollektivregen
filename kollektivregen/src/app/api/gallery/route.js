import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function POST(req) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const galleryCollection = db.collection("gallery");

    const { quoteid, uploadId, name, url } = await req.json();
    console.log("Received Data:", { quoteid, uploadId, name, url });

    // quoteid sicher parsen
    let parsedQuoteId = null;
    if (quoteid && quoteid !== "null") {
      try {
        parsedQuoteId = ObjectId.createFromHexString(quoteid);
      } catch (err) {
        return NextResponse.json(
          { success: false, error: "Ungültige quoteid" },
          { status: 400 }
        );
      }
    }
    console.log("parsedQuoteId:", parsedQuoteId, "type:", typeof parsedQuoteId);

    const uploadEntry = {
      uploadId: result.insertedId,
      name,
      url,
    };

    // Galerie suchen
    const existingGallery = await galleryCollection.findOne({
      quoteid: parsedQuoteId || { $eq: null },
    });
    console.log("Existing Gallery:", existingGallery);
    if (existingGallery) {
      // Upload in bestehende Galerie einfügen
      await galleryCollection.updateOne(
        { _id: existingGallery._id },
        { $push: { uploads: uploadEntry } }
      );
      return NextResponse.json({ success: true, updated: true });
    } else {
      // Neue Galerie erstellen
      const newGallery = {
        quoteid: parsedQuoteId, // darf auch null sein
        uploads: [uploadEntry],
      };
      await galleryCollection.insertOne(newGallery);
      return NextResponse.json({ success: true, created: true });
    }
  } catch (error) {
    console.error(
      "Fehler beim Erstellen oder Aktualisieren der Galerie:",
      error
    );
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
