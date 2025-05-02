'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../../components/navigation";

const Dashboard = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [coverImages, setCoverImages] = useState({});

  // countdown
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
      `${String(days).padStart(2, "0")}d•${String(hours).padStart(2, "0")}h•${String(minutes).padStart(2, "0")}m•${String(seconds).padStart(2, "0")}s`
    );
  };


  // Lade Galerien und Uploads beim Start
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/gallery");
        const json = await res.json();
        setGalleries(json.data); 
        // Fetch quotes
        const quoteRes = await fetch("/api/quotes");
        const quoteJson = await quoteRes.json();

        const weekKey = getCurrentWeekKey();
        if (Array.isArray(quoteJson) && quoteJson.length > 0) {
          const index = Math.abs(weekKey.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % quoteJson.length;
          setQuote(quoteJson[index]?.text);
        }

        // cover images
        const covers = {};
        json.data.forEach((gallery) => {
          const validUploads = gallery.uploads?.filter((u) => u.url);
          if (validUploads && validUploads.length > 0) {
            const randomUpload = validUploads[Math.floor(Math.random() * validUploads.length)];
            covers[gallery._id] = randomUpload;
          }
        });
        setCoverImages(covers);
      } catch (err) {
        console.error("Error fetching galleries:", err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Laden...</div>;
  }

  return (
    <div className="h-screen relative">
      {/* Text über den Bildern */}
      <div className="absolute z-10 top-1/2 -translate-y-1/2 body-text padding-21">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod
      </div>

      {/* Zitat + Countdown */}
      <div className="quote">
        <div className="quote">
          <div className="text-40">{quote || "Zitat wird geladen..."}</div>
          <div className="countdown">{countdown}</div>
        </div>
      </div>

      {/* Galerie Bilder */}
      <div className="cover-grid padding-21">
        <div className="grid grid-cols-4 gap-4">
        {galleries.map((gallery) => {
          const image = coverImages[gallery._id];
          if (!image) return null;

          return (
            <Link key={gallery._id} href={`/imagegallery/${gallery._id}`} className="z-40">
              <div className="cover-container">
                <Image
                  src={image.url.trimEnd()}
                  alt={image.name || "Gallery Image"}
                  width={87}
                  height={109}
                  className="object-cover w-full h-auto"
                />
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
