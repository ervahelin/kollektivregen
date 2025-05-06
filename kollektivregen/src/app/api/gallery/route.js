import { NextResponse } from "next/server";
import { MongoClient} from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("gallery");

    const galleryItems = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data: galleryItems });
  } catch (error) {
    console.error("Fehler beim Abrufen der Gallery:", error);
    return NextResponse.json(
      { success: false, error: "Fehler beim Abrufen der Gallery." },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
