// form/page.js
"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import BackButton from "../../components/backbutton";
import CustomSelect from "../../components/dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

const Form = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);  // Zustand für das ausgewählte Zitat
  const [nameFilled, setNameFilled] = useState(false);
  const [loading, setLoading] = useState(false); // State für den Ladeindikator
  const router = useRouter();

  const isFormValid = (checkboxChecked && imagePreview);

  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Bitte lade eine Bilddatei hoch.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Die Datei darf maximal 5 MB groß sein.");
      return;
    }

    try {
      setImageError(null); // Fehler zurücksetzen, wenn es ein neues Bild gibt
      setLoading(true); // Ladeindikator aktivieren
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 für die Vorschau
        setLoading(false); // Ladeindikator deaktivieren
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      setImageError("Fehler beim Verarbeiten des Bildes.");
      console.error(error);
      setLoading(false); // Ladeindikator deaktivieren
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true); // Ladeindikator aktivieren
      const name = e.target.name.value;
      const payload = {
        quoteid: selectedQuoteId || null,  // Die gewählte quoteid
        name: name || null,
        url: "https://example.com/test.jpg",
        checkbox: checkboxChecked,
      };
      console.log("Payload:", payload);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.success) {
          router.push("/form/success");
        } else {
          alert("Fehler beim Hochladen: " + data.error);
        }
      } catch (err) {
        console.error("Fehler:", err);
        alert("Netzwerkfehler.");
      } finally {
        setLoading(false); // Ladeindikator deaktivieren
      }
    },
    [imagePreview, checkboxChecked, selectedQuoteId, router]
  );

  return (
    <div>
      <form
        className="flex flex-col gap-5 lg:flex-row lg:justify-between w-full"
        onSubmit={handleSubmit}>
        {/* Bild */}
        <div className="body-text mt-7 lg:w-[20vw]">
          Lade hier eine Momentaufnahme hoch, die für dich einen Spruch lebendig
          macht, oder teile einfach eine besondere Alltagsimpression.
        </div>
        <div className="input-container">
          <label htmlFor="bild">Bild</label>
          <div className="relative overflow-hidden h-60" id="bild">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}
            {!imagePreview && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-1 gap-5">
                <div className="text-2xl font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.69 56.69"
                    className="w-6 h-6 fill-black stroke-transparent hover:stroke-black stroke-[2] transition-colors">
                    <polygon points="56.69 25.03 31.67 25.03 31.67 0 25.03 0 25.03 25.03 0 25.03 0 31.67 25.03 31.67 25.03 56.69 31.67 56.69 31.67 31.67 56.69 31.67 56.69 25.03" />
                  </svg>
                </div>
                <div className="text-sm lg:text-base">max. 10 MB</div>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                Lade...
              </div>
            )}
            <input
              type="file"
              id="bild"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={handleImageUpload}
            />
          </div>
          {imageError && (
            <div className="text-sm text-red-500 mt-1">{imageError}</div>
          )}
        </div>

        {/* Spruch */}
        <div className="flex flex-col gap-5 lg:justify-between lg:h-[785px] lg:w-[20vw]">
          <div className="flex flex-col gap-5">
            <div className="input-container">
              <label htmlFor="spruch">Spruch (optional)</label>
              <CustomSelect onSelect={setSelectedQuoteId} /> {/* übergebe den ausgewählten quoteid */}
            </div>
            <div className="input-container">
              <label htmlFor="name">Vorname (optional)</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className={`h-10 w-full transition-colors duration-300 ${
                  nameFilled
                    ? "bg-black text-white"
                    : "bg-transparent text-black"
                }`}
                onBlur={(e) => setNameFilled(e.target.value.trim() !== "")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 items-center">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="checkbox peer"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>
              <label htmlFor="checkbox" className="text-sm">
                Hiermit bestätigen Sie, dass Sie alle erforderlichen Rechte am
                Bild besitzen und gestatten kollektiv regen das Bild
                uneingeschränkt in allen Medien zu veröffentlichen, zu
                bearbeiten und zu verbreiten.
              </label>
            </div>
            <button
              type="submit"
              className={`button ${
                isFormValid
                  ? "bg-black text-white cursor-pointer"
                  : "btn-disabled cursor-not-allowed"
              }`}
              disabled={!isFormValid}>
              einsenden
            </button>
          </div>
        </div>
      </form>

      <div className="navigation">
        <div className="flex flex-row gap-5 lg:gap-10 justify-center">
          <BackButton />
          <Link href="/dashboard">
            <Image
              src="/logo.svg"
              alt="Logo"
              height={40}
              width={60}
              className="hover:scale-110 active:scale-110 transition lg:w-[105px] lg:h-[50px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
