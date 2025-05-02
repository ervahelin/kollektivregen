import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const quotes = await db.collection('quotes').find({}).toArray();

    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
