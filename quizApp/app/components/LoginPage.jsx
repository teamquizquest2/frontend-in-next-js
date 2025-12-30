"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./LoginPage.css";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login Successful");

        // Save user + token
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, role: data.role })
        );

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.role) {
          localStorage.setItem("role", data.role);
        }

        // Role based redirect (Next.js way)
        if (data.role?.toLowerCase() === "admin") {
          router.push("/admindashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server connection error — please check backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btnn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-link">
            Don’t have an account?{" "}
            <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
