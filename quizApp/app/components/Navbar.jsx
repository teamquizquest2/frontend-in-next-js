"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


import "./Navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => (pathname === path ? "active" : "");

  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="navbar-logo">
        <Link href="/" className="logo">
        
          QuizApp
        </Link>
      </div>

      {/* Center - Links */}
      <ul className="navbar-links">
        <li>
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
        </li>

        <li>
          <Link href="/services" className={isActive("/services")}>
            Services
          </Link>
        </li>

        <li>
          <Link href="/about" className={isActive("/about")}>
            About Us
          </Link>
        </li>

        <li>
          <Link href="/contact" className={isActive("/contact")}>
            Contact
          </Link>
        </li>

        <li>
          <Link href="/Dashboard" className={isActive("/Dashboard")}>
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Right - Buttons */}
      <div className="navbar-buttons">
        <Link href="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link href="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}


