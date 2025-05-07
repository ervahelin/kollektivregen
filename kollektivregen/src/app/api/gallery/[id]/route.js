import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("gallery");

    const gallery = await collection.findOne({ _id: new ObjectId(id) });

    if (!gallery) {
      return NextResponse.json(
        { error: "Galerie nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("Fehler beim Abrufen der Galerie:", error);
    return NextResponse.json({ error: "Fehler beim Abrufen" }, { status: 500 });
  } finally {
    await client.close();
  }
}
