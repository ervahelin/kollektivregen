"use client";
import { useState, useRef, useEffect } from "react";

const Dropdown = ({ onSelect }) => {
  const placeholder = "Spruch auswählen";
  const [selectedText, setSelectedText] = useState(placeholder);
  const [quotes, setQuotes] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("/api/quotes");
        const data = await res.json();
  
        const startDate = new Date("2025-05-03"); // Start Datum fest eintragen
        const today = new Date();
  
        const msPerWeek = 7 * 24 * 60 * 60 * 1000;
        const weeksSinceStart = Math.floor((today - startDate) / msPerWeek);
  
        const visibleQuotes = data.slice(0, weeksSinceStart + 1);
  
        setQuotes([{ id: null, text: "Ohne Spruch" }, ...visibleQuotes]);
      } catch (err) {
        console.error("Fehler beim Laden der Zitate:", err);
      }
    };
  
    fetchQuotes();
  }, []);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (quote) => {
    setSelectedText(quote.text);
    setOpen(false);
    onSelect(quote.id);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`dropdown-button transition-colors ${
          selectedText !== placeholder
            ? "bg-black text-white"
            : "bg-transparent text-black"
        }`}>
        {selectedText}
      </button>

      {open && (
        <ul className="absolute z-50 bg-white mt-1 w-full">
          {quotes.map((quote) => (
            <li
              key={quote.id || "none"}
              onClick={() => handleSelect(quote)}
              className="cursor-pointer">
              {quote.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;