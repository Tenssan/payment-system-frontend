"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const ChangeLanguageButton: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="h-10 w-10 bg-gray-500 p-2 text-white fixed top-4 right-4 z-50 rounded"
    >
      {i18n.language === "es" ? "EN" : "ES"}
    </button>
  );
};

export default ChangeLanguageButton;
