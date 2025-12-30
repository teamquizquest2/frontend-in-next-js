"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="app-main">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
