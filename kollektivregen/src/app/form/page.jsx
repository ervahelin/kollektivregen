"use client";
import React, { useState } from "react";
import Link from "next/link";
import BackButton from "../../components/backbutton";
import CustomSelect from "../../components/dropdown";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

const Form = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const router = useRouter();
  const [nameFilled, setNameFilled] = useState(false);

  const isFormValid = checkboxChecked && imagePreview;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setImageError("Die Datei darf maximal 10 MB groß sein.");
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setImageError("Bitte lade eine Bilddatei hoch.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const payload = {
      quoteid: selectedQuoteId,
      name: name || null,
      url: imagePreview,
      checkbox: checkboxChecked,
    };

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
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="body-text mt-75">
        Lade hier eine Momentaufnahme hoch, die für dich einen Spruch lebendig
        macht, oder teile einfach eine besondere Alltagsimpression.
      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="spruch">Spruch (optional)</label>
          <CustomSelect onSelect={(id) => setSelectedQuoteId(id)} />
        </div>
        <div className="input-container">
          <label htmlFor="name">Vorname (optional)</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className={`h-10 w-full transition-colors duration-300 ${nameFilled ? 'bg-black text-white' : 'bg-white text-black'}`}
            onBlur={(e) => setNameFilled(e.target.value.trim() !== "")}
          />
        </div>
        <div className="input-container">
          <label htmlFor="bild">Bild</label>
          <div className="relative overflow-hidden h-60 bg-gray-100" id="bild">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}
            {!imagePreview && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-1">
                <div className="text-2xl font-bold">+</div>
                <div className="text-sm">max. 10 MB</div>
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
            Hiermit bestätigen Sie, dass Sie alle erforderlichen Rechte am Bild besitzen und gestatten kollektiv regen das Bild uneingeschränkt in allen Medien zu veröffentlichen, zu bearbeiten und zu verbreiten.
          </label>
        </div>
        <button
          type="submit"
          className={`button ${
            isFormValid
              ? "bg-black text-white"
              : "btn-disabled"
          }`}
          disabled={!isFormValid}
        >
          einsenden
        </button>
      </form>
      <div className="navigation">
        <div className="flex flex-row gap-5">
          <BackButton />
          <Link href="/dashboard">
            <Image src="/logo.svg" alt="Logo" height={40} width={60} className="hover:scale-110 active:scale-110 transition"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
