"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChangeLanguageButton from "@/app/components/misc/ToggleLanguageButton";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/index";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nextProvider i18n={i18n}>
      <html lang="en">
        <body className={`bg-white text-black ${inter.className}`}>
          <div>
            <ChangeLanguageButton />
            {children}
          </div>
        </body>
      </html>
    </I18nextProvider>
  );
}
