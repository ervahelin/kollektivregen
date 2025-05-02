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
        setQuotes([{ _id: null, text: "Ohne Spruch" }, ...data]);
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
    onSelect(quote._id);
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
        <ul className="absolute z-50 bg-white mt-1 w-full overflow-y-auto">
          {quotes.map((quote) => (
            <li
              key={quote._id || "none"}
              onClick={() => handleSelect(quote)}
              className="cursor-pointer py-2">
              {quote.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
