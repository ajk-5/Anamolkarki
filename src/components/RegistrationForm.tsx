"use client";

import React, { useState } from "react";
import { registerUser, UserRegistrationData } from "../lib/UserServices";

export default function RegistrationForm() {
  const [formData, setFormData] = useState<UserRegistrationData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const result = await registerUser(formData);
      setMessage("Registration successful!");
      console.log("Registration result:", result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred");
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(45deg,#000000,#132a02,#000000,#010a58,#000000,#1b3e02,#000000,#132a02)]">
      <div className="mt-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl p-6 max-w-md w-full animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#dfcea8" }}>
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="username"
              className="block text-base font-medium mb-1"
              style={{ color: "#dfcea8" }}
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white bg-opacity-30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#dfcea8]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium mb-1"
              style={{ color: "#dfcea8" }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white bg-opacity-30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#dfcea8]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium mb-1"
              style={{ color: "#dfcea8" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white bg-opacity-30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#dfcea8]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base font-medium mb-1"
              style={{ color: "#dfcea8" }}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white bg-opacity-30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#dfcea8]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-base font-medium mb-1"
              style={{ color: "#dfcea8" }}
            >
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-white bg-opacity-30 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#dfcea8]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md text-lg font-bold transition-colors"
            style={{ backgroundColor: "#dfcea8", color: "#000000" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {message && (
            <p className="mt-3 text-center text-base" style={{ color: "#dfcea8" }}>
              {message}
            </p>
          )}
        </form>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
