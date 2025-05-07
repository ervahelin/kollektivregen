"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackButton from "../../../components/backbutton";
import { useSwipeable } from "react-swipeable";

export default function GalleryDetailPage() {
  const { galleryid } = useParams();
  const [gallery, setGallery] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/gallery/${galleryid}`);
        const data = await res.json();
        setGallery(data);

        if (data?.quoteid) {
          const quoteRes = await fetch(`/api/quotes/${data.quoteid}`);
          const quoteData = await quoteRes.json();
          setQuote(quoteData?.text_formatted || null);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [galleryid]);

  const uploads = gallery?.uploads || [];

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % uploads.length);
  }, [uploads]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + uploads.length) % uploads.length);
  }, [uploads]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) return <div className="p-4 text-center">Lade...</div>;
  if (!gallery)
    return <div className="p-4 text-center">Keine Galerie gefunden.</div>;

  return (
    <div className="mx-auto">
      <div className="padding-21 pt-[10vh] h-screen flex flex-col lg:grid lg:grid-cols-3 lg:w-full justify-center">
        {/* Quote Section */}
        <div className="mb-6 text-xl lg:text-[34px] italic pb-4 lg:order-1">
          {quote}
        </div>

        {/* Image Slider */}
        {uploads.length > 0 && (
          <div className="relative w-full flex flex-col gap-2 lg:gap-4 lg:order-2">
            <div className="flex justify-between items-center lg:gap-[60px] lg:h10/12">
              <button onClick={prevImage} className="hidden md:block px-2 py-1">
                <Image
                  src="/arrow.svg"
                  width={60}
                  height={60}
                  alt="Zurück"
                  className="scale-x-[-1]"
                />
              </button>

              <div
                {...swipeHandlers}
                className="aspect-[4/5] w-full max-w-md mx-auto relative overflow-hidden">
                <Image
                  src={uploads[currentIndex]?.url}
                  alt={uploads[currentIndex]?.name || "Bild"}
                  fill
                  className="object-cover"
                />
              </div>

              <button onClick={nextImage} className="hidden md:block px-2 py-1">
                <Image src="/arrow.svg" width={60} height={60} alt="Weiter" />
              </button>
            </div>

            {/* Image Info */}
            {uploads[currentIndex]?.name && (
              <div className="text-center">
                <p className="body-text">
                  {uploads[currentIndex].name} | {uploads[currentIndex].date}
                </p>
              </div>
            )}

            {/* Dots */}
            <div className="flex justify-center space-x-2">
              {uploads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Bild ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="hidden lg:block lg:order-3"></div>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-row lg:h-[120px] lg:px-[5vw] justify-between w-full padding-21 fixed bottom-4 h-20 items-center">
        <div className="flex flex-row gap-2 lg:gap-14">
          <BackButton />
          <Link href="/dashboard">
            <Image
              src="/logo.svg"
              width={60}
              height={40}
              alt="Logo"
              className="hover:scale-110 active:scale-110 transition lg:w-[105px] lg:h-[50px]"
            />
          </Link>
        </div>
        <Link href="/form">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56.69 56.69"
            className="w-6 h-6 lg:w-[35px] lg:h-[35px] fill-black stroke-transparent hover:stroke-black stroke-[2] transition-colors">
            <polygon points="56.69 25.03 31.67 25.03 31.67 0 25.03 0 25.03 25.03 0 25.03 0 31.67 25.03 31.67 25.03 56.69 31.67 56.69 31.67 31.67 56.69 31.67 56.69 25.03" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
