import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function GET({ request, params }) {
  const { id } = params;

  try {
    await client.connect();
    const db = client.db(dbName);
    const quote = await db
      .collection("quotes")
      .findOne({ _id: new ObjectId(id) });

    if (!quote) {
      return NextResponse.json(
        { error: "Quote nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json(quote);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
