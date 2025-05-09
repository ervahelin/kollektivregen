import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function POST(req) {
  try {
    await client.connect();
    const db = client.db(dbName);

    const uploadsCollection = db.collection("form_uploads");
    const galleryCollection = db.collection("gallery");

    const body = await req.json();

    
    const { name, url, quoteid, checkbox } = body;

    const parsedQuoteId = ObjectId.createFromHexString(quoteid)
    
    // Step 1: Upload speichern
    const uploadDoc = {
      name,
      url,
      checkbox,
      quoteid: parsedQuoteId,
      createdAt: new Date()
    };

    const result = await uploadsCollection.insertOne(uploadDoc);

    // Step 2: Upload-Eintrag vorbereiten
    const uploadEntry = {
      uploadId: result.insertedId,
      name,
      url
    };

    // Step 3: Galerie suchen oder erstellen, auch wenn quoteid null ist
    const obj = await galleryCollection.find()
    console.warn(obj)
    console.warn(parsedQuoteId)
    
    const existingGallery = await galleryCollection.findOne({ 
      quoteid: quoteid ? parsedQuoteId : null
    });

    if (existingGallery) {
      // Galerie mit passender `quoteid` gefunden, füge den Upload hinzu
      await galleryCollection.updateOne(
        { _id: existingGallery._id },
        { $push: { uploads: uploadEntry } }
      );
    } else {
      // Keine Galerie gefunden, erstelle eine neue Galerie
      const newGallery = {
        quoteid: parsedQuoteId, // das kann auch null sein!
        uploads: [uploadEntry]
      };
      await galleryCollection.insertOne(newGallery);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fehler beim Upload:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
