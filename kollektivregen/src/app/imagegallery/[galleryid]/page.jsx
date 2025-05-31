"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "../../../components/backbutton";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";

export default function GalleryDetailPage() {
  const { galleryid } = useParams();
  const [gallery, setGallery] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`/api/gallery/${galleryid}`);
        const data = await res.json();
        setGallery(data);

        // Hole das Quote passend zur gallery
        if (data.quoteid) {
          const quoteRes = await fetch(`/api/quotes/${data.quoteid}`);
          const quoteData = await quoteRes.json();
          setQuote(quoteData?.text_formatted || null);
        }
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, [galleryid]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % uploads.length),
    onSwipedRight: () =>
      setCurrentIndex((currentIndex - 1 + uploads.length) % uploads.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) return <div className="p-4 text-center">Lade...</div>;
  if (!gallery)
    return <div className="p-4 text-center">Keine Galerie gefunden.</div>;

  const uploads = gallery.uploads || [];

  return (
    <div className="mx-auto flex flex-col justify-center h-screen -mt-16">
      <div className="padding-21">
      {/* Zitat */}
      {quote && <div className="mb-6 text-xl italic pb-4">{quote}</div>}

      {/* Bild-Slider */}
      {uploads.length > 0 && (
        <div className="relative w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <button
              onClick={() =>
                setCurrentIndex(
                  (currentIndex - 1 + uploads.length) % uploads.length
                )
              }
              className="hidden md:block px-2 py-1">
              ‹
            </button>
            <div
              {...handlers}
              className="aspect-[4/5] w-full max-w-md mx-auto relative overflow-hidden">
              <Image
                src={uploads[currentIndex].url}
                alt={uploads[currentIndex].name || "Bild"}
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={() =>
                setCurrentIndex((currentIndex + 1) % uploads.length)
              }
              className="hidden md:block px-2 py-1">
              ›
            </button>
          </div>
          <div className="text-center">
            {uploads[currentIndex].name && (
              <p className="body-text">
                {uploads[currentIndex].name} | {uploads[currentIndex].date}
              </p>
            )}
          </div>
          {/* Dots */}
          <div className="flex justify-center space-x-2">
            {uploads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "black" : "grey"
                }`}
                aria-label={`Bild ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      </div>
      <div className="flex flex-row justify-between w-12/12 padding-21 fixed bottom-4 h-20 items-center">
        <div className="flex flex-row gap-2">
          <BackButton/>
          <Link href="/dashboard">
            <Image src="/logo.svg" width={60} height={40} alt="logo" className="hover:scale-110 active:scale-110 transition"/>
          </Link>
        </div>
        <Link href="/form">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.69 56.69"
                className="w-6 h-6 fill-black stroke-transparent hover:stroke-black stroke-[2] transition-colors"
            >
                <polygon points="56.69 25.03 31.67 25.03 31.67 0 25.03 0 25.03 25.03 0 25.03 0 31.67 25.03 31.67 25.03 56.69 31.67 56.69 31.67 31.67 56.69 31.67 56.69 25.03" />
            </svg>
        </Link>
      </div>

    </div>
  );
}
