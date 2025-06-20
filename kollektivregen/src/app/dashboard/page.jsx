"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../../components/navigation";
import { FadeLoader } from "react-spinners";

const Dashboard = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [coverImages, setCoverImages] = useState({});
  const [formattedQuote, setFormattedQuote] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();

        const randomCovers = {};
        data.forEach((gallery) => {
          const validUploads = gallery.uploads.filter((u) => u.url);
          const random =
            validUploads.length > 0
              ? validUploads[Math.floor(Math.random() * validUploads.length)]
              : null;

          randomCovers[gallery.id] = random?.url || "/placeholder.png";
        });

        setGalleries(data);
        setCoverImages(randomCovers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching galleries:", error);
      }
    }

    fetchGalleries();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("/api/quotes");
        const data = await res.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();

    const startDate = new Date("2025-05-09");
    const currentDate = new Date();
    const diffInWeeks = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24 * 7)
    );
    setCurrentWeek(diffInWeeks);
  }, []);

  useEffect(() => {
    const currentQuote = quotes[currentWeek % quotes.length];
    setQuote(currentQuote);
    setFormattedQuote(renderItalicizedQuote(currentQuote?.text || ""));

    const updateCountdown = () => {
      const end = getNextWeekTime().getTime();
      const now = new Date().getTime();
      const delta = Math.max(0, end - now);

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((delta / (1000 * 60)) % 60);

      setCountdown(
        `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [currentWeek, quotes]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 100;
      const fadeEnd = 600;

      const progress = Math.min(
        Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0),
        1
      );

      const newOpacity = 1 - progress;
      const newBlur = progress * 5;

      document.documentElement.style.setProperty(
        "--quote-opacity",
        newOpacity.toString()
      );
      document.documentElement.style.setProperty(
        "--quote-blur",
        `${newBlur}px`
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNextWeekTime = () => {
    const now = new Date();
    const diff = 7 - now.getDay();
    const endOfWeek = new Date(now.setDate(now.getDate() + diff));
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  };

  const renderItalicizedQuote = (text) => {
    if (!text) return null;

    const letters = text.split("");
    const letterIndices = letters
      .map((char, i) => (/[a-zA-Z]/.test(char) ? i : null))
      .filter((i) => i !== null);

    const numToItalicize = Math.floor(letterIndices.length * 0.2);
    const italicIndices = new Set();

    while (italicIndices.size < numToItalicize) {
      const randomIndex =
        letterIndices[Math.floor(Math.random() * letterIndices.length)];
      italicIndices.add(randomIndex);
    }

    return letters.map((char, i) =>
      italicIndices.has(i) ? <i key={i}>{char}</i> : <span key={i}>{char}</span>
    );
  };

  // Positionierungen
const positionsMobile = [
  "col-start-1 row-start-1",          
  "col-start-4 row-start-1",  
  "col-start-2 row-start-2 -translate-y-[50%]",         
  "col-start-3 row-start-3 -translate-y-[100%]",  
  "col-start-1 row-start-4 -translate-y-[150%]",         
  "col-start-4 row-start-4 -translate-y-[150%]",     
  "col-start-3 row-start-5 -translate-y-[150%]", 
  "col-start-2 row-start-6 -translate-y-[200%]",
];

const positionsDesktop = [
  "lg:col-start-1 lg:row-start-1",          
  "lg:col-start-4 lg:row-start-1",  
  "lg:col-start-6 lg:row-start-1 lg:-translate-y-0",         
  "lg:col-start-2 lg:row-start-2 lg:-translate-y-1/2",  
  "lg:col-start-3 lg:row-start-3 lg:-translate-y-[100%]",  
  "lg:col-start-5 lg:row-start-3 lg:-translate-y-[100%]", 
  "lg:col-start-1 lg:row-start-4 lg:-translate-y-[150%]",         
  "lg:col-start-6 lg:row-start-4 lg:-translate-y-[150%]",          
];


  if (!quote)
    return (
      <div className="padding-21 flex items-center justify-center h-screen">
        <FadeLoader color="#1C1B1B" />
      </div>
    );

  // load more button
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };


  return (
    <div className={`h-screen relative ${animate ? "fade-slide-in" : ""}`}>
      {/* Intro-Text */}
      <div className="flex absolute z-10 top-1/2 w-full lg:justify-center">
        <div className="-translate-y-1/2 body-text padding-21 lg:w-6/12">
          Wir möchten dich dazu anregen, wieder bewusster im Moment zu leben. Mithilfe von wöchentlichen Sprüchen
          regenerieren wir deine Wahrnehmung und präsentieren dir den Alltag als eine Quelle voller Inspiration,
          aufregender Entdeckungen und überraschender Perspektiven.
        </div>
      </div>

      {/* Quote */}
      <div className="quote quote-fx px-[21px] lg:px-[0px]">
        <div className="text-[40px] leading-[46px] lg:leading-[96px] lg:text-[90px] lg:max-w-8/12 real-text-pro-semilight">
          {formattedQuote}
        </div>
        <div className="countdown">nächster Spruch: {countdown}</div>
      </div>

      {/* Galerie */}
      <div className="cover-grid flex flex-col bottom-0 z-10">
      <div className="grid grid-cols-4 lg:grid-cols-6 w-full padding-21 auto-rows-[109px] lg:auto-rows-[340px]">
        {galleries.slice(0, visibleCount).map((gallery, index) => {
        const coverUrl = coverImages[gallery.id] || "/placeholder.png";
        const positionClass = `${positionsMobile[index % positionsMobile.length]} ${positionsDesktop[index % positionsDesktop.length]}`;
        const isHovered = hoveredId === null || hoveredId === gallery.id;

        return (
          <Link
            key={gallery.id}
            href={`/gallery/${gallery.id}`}
            className={`relative col-span-1 ${positionClass}`}
            onMouseEnter={() => setHoveredId(gallery.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative w-full h-full transition-opacity duration-300">
              <Image
                src={coverUrl}
                alt={`Cover Bild Galerie ${gallery.id}`}
                fill
                className={`cover ease-in-out ${
                  hoveredId === null
                    ? ""
                    : isHovered
                    ? "scale-110 z-10"
                    : "opacity-0"
                }`}
              />
            </div>
          </Link>
        );
        
        })}
      
      </div>
      {visibleCount < galleries.length && (
          <div className="w-full flex justify-end mt-8 padding-21">
            <button
              onClick={handleLoadMore}
              className="underline text-[#AFAFAF] cursor-pointer transition lg:text-xl"
            >
              mehr laden
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Dashboard;
