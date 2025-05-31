"use client";

import React, { useEffect, useState, useMemo } from "react";import Link from "next/link";
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

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setGalleries(data);
        const coverImages = {};
        data.forEach((gallery) => {
          coverImages[gallery.id] = gallery.coverImage || "https://via.placeholder.com/150";
        });
        setCoverImages(coverImages);
        
      } catch (error) {
        console.error("Error fetching galleries:", error);
      }
    }

    fetchGalleries();
  }, []);
  
  useEffect(() => {
    // API für alle Zitate abrufen
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

    // Berechne die aktuelle Woche basierend auf dem Startdatum
    const startDate = new Date('2025-05-09');
    const currentDate = new Date();
    const diffInWeeks = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7));
    setCurrentWeek(diffInWeeks);
  }, []);

  useEffect(() => {
    const currentQuote = quotes[currentWeek % quotes.length];
    setQuote(currentQuote);
    setFormattedQuote(renderItalicizedQuote(currentQuote?.text || ""));

    // Countdown bis zum nächsten Zitat
    const updateCountdown = () => {
      const end = getNextWeekTime().getTime();
      const now = new Date().getTime();
      const delta = Math.max(0, end - now);

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((delta / (1000 * 60)) % 60);
      const seconds = Math.floor((delta / 1000) % 60);

      setCountdown(
        `${String(days).padStart(2, "0")}d•${String(hours).padStart(2, "0")}`
        + `h•${String(minutes).padStart(2, "0")}m•${String(seconds).padStart(2, "0")}s`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);

  }, [currentWeek, quotes]);

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
      const randomIndex = letterIndices[Math.floor(Math.random() * letterIndices.length)];
      italicIndices.add(randomIndex);
    }
  
    return letters.map((char, i) =>
      italicIndices.has(i) ? <i key={i}>{char}</i> : <span key={i}>{char}</span>
    );
  };
  

  if (!quote) return <div className="padding-21 flex items-center justify-center h-screen"> <FadeLoader color="#1C1B1B" /></div>;

  return (
    <div className="h-screen relative">
      {/* Text über den Bildern */}
      <div className="flex absolute z-10 top-1/2 w-full lg:justify-center">
        <div className="-translate-y-1/2 body-text padding-21 lg:w-6/12">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod
        </div>
      </div>

      {/* Zitat und Countdown */}
      <div className="quote">
        <div className="text-[40px] leading-[46px] lg:leading-[96px] lg:text-[90px] lg:max-w-8/12 real-text-pro-semilight">
        {formattedQuote}
        </div>
        <div className="countdown">{countdown}</div>
      </div>

      {/* Galerie Bilder */}
      <div className="cover-grid padding-21">
  <div className="relative w-full min-h-[800px]">
    {galleries.map((gallery, index) => {
      return (
        <Link
          key={gallery.id || index}
          href={`/gallery/${gallery.id}`}
          className="absolute z-40"
        >
        
          <div className="cover-container">
            Galerie {gallery.id}
            {/* Loggt den Alt-Text 
            <Image
              src="/plus.svg"
              alt={gallery.name || "Gallery Image"}
              width={87}
              height={109}
              className="object-cover"
            />*/}
          </div>
        </Link>
      );
    })}
  </div>
</div>
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Dashboard;
