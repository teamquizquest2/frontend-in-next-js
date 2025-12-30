"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./Signup.css";

import { sanitizeInput } from "../utils/sanitizeInput";
import { isAlphabetOnly } from "../utils/isAlphabetOnly";
import { charLength } from "../utils/charLength";
import { regEmailTest } from "../utils/regEmailTest";

function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "Student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize inputs
    const name = sanitizeInput(formData.name);
    const email = sanitizeInput(formData.email);
    const password = sanitizeInput(formData.password);
    const confirmPassword = sanitizeInput(formData.confirmPassword);

    // Frontend validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (!isAlphabetOnly(name)) {
      alert("Name should only contain alphabets");
      return;
    }

    if (!regEmailTest(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (charLength(password, 6, 20) === 0) {
      alert("Password must be between 6–20 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          status: formData.status,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        localStorage.setItem("user", JSON.stringify(result.user));

        alert("Account created successfully");

        // Next.js redirect
        router.push("/login");
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server connection error");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2 className="signup-title">
          Create Your <span>QuizApp</span> Account
        </h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-signup">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
