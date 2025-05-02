import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "kollektivregen";

export async function POST(request) {
  const body = await request.json();

  try {
    await client.connect();
    const db = client.db(dbName);

    // 1. Upload in form_uploads speichern
    const uploadsCollection = db.collection("form_uploads");
    const uploadResult = await uploadsCollection.insertOne(body);

    const uploadId = uploadResult.insertedId;
    const { quoteid, name, url } = body;

    const galleriesCollection = db.collection("gallery");

    // 2. Galerie mit gleichem quoteid suchen
    const existingGallery = await galleriesCollection.findOne({ quoteid: new ObjectId(quoteid) });

    const newUpload = {
      uploadId,
      name,
      url,
    };

    if (existingGallery) {
      // 3a. Falls vorhanden, Upload zur bestehenden Galerie hinzufügen
      await galleriesCollection.updateOne(
        { _id: existingGallery._id },
        { $push: { uploads: newUpload } }
      );
    } else {
      // 3b. Falls nicht vorhanden, neue Galerie anlegen
      await galleriesCollection.insertOne({
        quoteid: new ObjectId(quoteid),
        uploads: [newUpload],
      });
    }

    return NextResponse.json({ success: true, id: uploadId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
