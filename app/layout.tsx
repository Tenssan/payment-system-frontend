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
      <body className={inter.className}>
        <div className="flex flex-col lg:flex-row"> 
          <Sidebar />
          <div className="flex-1 lg:ml-64 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
