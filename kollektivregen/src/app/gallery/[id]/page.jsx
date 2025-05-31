"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navigation from "@/src/components/navigation";
import BackButton from "@/src/components/backbutton";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";

const GalleryPage = () => {
  const params = useParams();
  const id = params?.id;

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id) {
      async function fetchGallery() {
        try {
          const res = await fetch(`/api/gallery/${id}`);
          const data = await res.json();
          setGallery(data); // Directly set the gallery with its related quote
        } catch (error) {
          console.error("Fehler beim Laden der Galerie:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchGallery();
    }
  }, [id]);

  const uploads = gallery?.uploads || [];
  const quote = gallery?.quote?.text_formatted; // Directly access the quote text

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % uploads.length),
    onSwipedRight: () =>
      setCurrentIndex((currentIndex - 1 + uploads.length) % uploads.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) {
    return <div className="p-4 text-center">Galerie wird geladen...</div>;
  }

  if (!gallery) {
    return <div className="p-4 text-center">Diese Galerie existiert nicht.</div>;
  }

  return (
    <div className="mx-auto flex flex-col justify-center h-screen -mt-16">
      <div className="padding-21 flex flex-col lg:flex-row">
        {/* Zitat */}
        <div className="lg:w-3/12">
          {quote ? (
            <div className="mb-6 text-[22px] leading-[28px] real-text-pro-semilight-italic  pb-4 lg:text-[34px] lg:leading-10">{quote}</div>
          ) : (
            <div className="mb-6 text-[22px] leading-[28px] real-text-pro-semilight-italic  pb-4 lg:text-[34px] lg:leading-10">Zitat wird geladen...</div>
          )}
        </div>

        {/* Bild-Slider */}
        {uploads.length > 0 && (
          <div className="relative w-full flex flex-col gap-2 lg:gap-4 ">
            <div className="flex flex-row justify-center items-center gap-16">
              <button
                onClick={() =>
                  setCurrentIndex(
                    (currentIndex - 1 + uploads.length) % uploads.length
                  )
                }
                className="hidden md:block px-2 py-1"
              >
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.69 56.69"
                  className="w-5 h-5 fill-black stroke-transparent hover:stroke-black stroke-[2] scale-x-[-1] transition-colors cursor-pointer lg:w-[35px] lg:h-[35px]">
                  <polygon points="17.21 1.37 12.51 6.01 34.84 28.35 12.51 50.61 17.21 55.32 44.19 28.35 17.21 1.37" />
                </svg>
              </button>
              <div
                {...handlers}
                className="w-[540px] h-[670px] bg-amber-50  relative overflow-hidden"
              >
                {/* Image Slider */}
                <div>{gallery.id}</div>
              </div>
              <button
                onClick={() =>
                  setCurrentIndex((currentIndex + 1) % uploads.length)
                }
                className="hidden md:block px-2 py-1"
              >
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56.69 56.69"
                  className="w-5 h-5 fill-black stroke-transparent hover:stroke-black stroke-[2] transition-colors cursor-pointer lg:w-[35px] lg:h-[35px]">
                  <polygon points="17.21 1.37 12.51 6.01 34.84 28.35 12.51 50.61 17.21 55.32 44.19 28.35 17.21 1.37" />
                </svg>
              </button>
            </div>

            {/* Bildbeschreibung */}
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
                    index === currentIndex ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Bild ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="lg:w-3/12"></div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-row justify-between w-12/12 padding-21 fixed bottom-4 h-20 items-center">
        <div className="flex flex-row gap-2 lg:gap-14">
          <BackButton/>
          <Link href="/">
            <Image
              src="/logo.svg"
              width={60}
              height={40}
              alt="logo"
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
};

export default GalleryPage;
