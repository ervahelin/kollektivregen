// components/dropdown.js
import { useEffect, useState } from 'react';

const CustomSelect = ({ onSelect }) => {
  const [quotes, setQuotes] = useState([]); // Zustand für die Zitate
  const [selectedQuote, setSelectedQuote] = useState(); // Das ausgewählte Zitat
  const [currentWeek, setCurrentWeek] = useState(0); // Woche für das Zitat-Management

  useEffect(() => {
    // API aufrufen, um die Zitate zu laden
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes');
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Zitate:', error);
      }
    };

    fetchQuotes();

    // Berechne die aktuelle Woche basierend auf dem aktuellen Datum
    const startDate = new Date('2025-05-09'); // Setze das Startdatum (z.B. heute)
    const currentDate = new Date();
    const diffInWeeks = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 7)); // Wochen seit dem Startdatum
    setCurrentWeek(diffInWeeks);

  }, []);

  const handleChange = (e) => {
    const selectedQuoteId = e.target.value;
    setSelectedQuote(selectedQuoteId);
    onSelect(selectedQuoteId); // Übergibt den Wert an das übergeordnete Formular
  };

  return (
    <div className="relative w-full">
      <select
        id="quote-dropdown"
        value={selectedQuote}
        onChange={handleChange}
        className={`dropdown-button transition-colors italic w-full mt-1 ${
          selectedQuote !== null ? "bg-black text-white" : "bg-transparent text-black"
        }`}
      >
        <option value={""} className="text-black">
          Kein Zitat
        </option>
        {quotes.slice(0, currentWeek + 1).map((quote) => (
          <option key={quote.id} value={quote.id} className="text-black">
            {quote.text}  {/* Nur das text-Feld anzeigen */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
