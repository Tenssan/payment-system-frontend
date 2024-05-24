import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Pago",
  description: "Proyecto de sistema de gestión de pagos para proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-white text-black ${inter.className}`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 lg:ml-32 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
