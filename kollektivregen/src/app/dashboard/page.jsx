"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../../components/navigation";

/* Neue Positionsfunktion
const generatePositions = (
  count,
  maxCols = 4,
  imageWidth = 87,
  imageHeight = 109,
  stepY = 54
) => {
  const positions = [];

  if (count > 0) {
    positions.push({ top: 0, left: 0 });
  }
  if (count > 1) {
    positions.push({ top: 0, left: (maxCols - 1) * imageWidth });
  }

  let placed = 2;
  let row = 1;

  while (placed < count) {
    for (let col = 0; col < maxCols && placed < count; col++) {
      const offsetY = col % 2 === 0 ? 0 : stepY;
      const top = imageHeight + (row - 1) * stepY + offsetY;
      const left = col * imageWidth;
      positions.push({ top, left });
      placed++;
    }
    row++;
  }

  return positions;
};*/

const Dashboard = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [coverImages, setCoverImages] = useState({});

  //const positions = useMemo(() => generatePositions(galleries.length), [galleries]);

  const getCurrentWeekKey = () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    return monday.toISOString().split("T")[0];
  };

  const getNextWeekTime = () => {
    const now = new Date();
    const endOfWeek = new Date(now);
    const day = now.getDay();
    const diff = 7 - day;
    endOfWeek.setDate(now.getDate() + diff);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  };

  const updateCountdown = () => {
    const end = getNextWeekTime().getTime();
    const now = new Date().getTime();
    const delta = Math.max(0, end - now);

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const seconds = Math.floor((delta / 1000) % 60);

    setCountdown(
      `${String(days).padStart(2, "0")}d•${String(hours).padStart(
        2,
        "0"
      )}h•${String(minutes).padStart(2, "0")}m•${String(seconds).padStart(
        2,
        "0"
      )}s`
    );
  };

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("/api/quotes/single");
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
        } else {
          setQuote(data);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, []);

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

  // Countdown Aktualisierung
  useEffect(() => {
    updateCountdown(); // Sofortige Aktualisierung bei Initialisierung
    const intervalId = setInterval(updateCountdown, 1000); // Alle 1 Sekunde aktualisieren

    // Aufräumen des Intervalls
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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

      {/* Zitat + Countdown */}
      <div className="quote">
        <div className="text-[40px] lg:text-[90px]">
          {quote?.text || "Zitat wird geladen..."}
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
