import React from 'react';
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb';

async function getGallery(galleryId) {
  const client = await clientPromise;
  const db = client.db();
  
  const gallery = await db.collection('gallery').findOne({
    _id: new ObjectId(galleryId),
  });

  if (!gallery) return null;

  const quote = await db.collection('quotes').findOne({
    _id: new ObjectId(gallery.quoteid),
  });

  const uploads = await db
    .collection('form_uploads')
    .find({
      _id: { $in: gallery.uploads.map((id) => new ObjectId(id)) },
    })
    .toArray();

  return {
    ...gallery,
    quoteText: quote ? quote.text : 'Kein Spruch gefunden', 
    uploads: uploads,
  };
}

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db();
  const galleries = await db.collection('gallery').find().toArray();

  return galleries.map((gallery) => ({
    galleryId: gallery._id.toString(),
  }));
}

const ImageGalleryPage = async ({ params }) => {
  const { galleryId } = params;
  const gallery = await getGallery(galleryId);

  if (!gallery) {
    return <div>Galerie nicht gefunden</div>;
  }

  return (
    <div className="gallery-page-container">
      <div className="mt-75 quote-gallery-text">
        {gallery.quoteText}
      </div>

      <div className="flex flex-col items-center w-full">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          className="w-full max-w-3xl"
          pagination={{ clickable: true }}
        >
          {gallery.uploads.map((upload) => (
            <SwiperSlide key={upload.uploadId.toString()}>
              <div className="flex flex-col items-center">
                <img
                  src={upload.url}
                  alt={upload.name}
                  className="w-80 h-80 object-cover rounded-lg"
                />
                <div className="mt-2 text-center text-lg">{upload.name}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <div className="flex flex-row justify-between">
          <Link href="/">kollektiv regen</Link>
        </div>
        <Link href="/form" className="text-xl">
          +
        </Link>
      </div>
    </div>
  );
};

export default ImageGalleryPage;
