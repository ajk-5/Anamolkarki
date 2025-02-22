"use client"; // Directive correcte pour le côté client

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, UserLoginData } from "../lib/UserServices";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserLoginData>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await loginUser(formData);
      const resData = await response.json();

      if (response.status === 403 && resData.redirectTo) {
        router.push(resData.redirectTo); // Redirection vers /verify
      } else if (response.ok) {
        router.push("/dashboard"); // Connexion réussie
        setMessage("Login successful!");
      } else {
        throw new Error(`Error ${response.status}: ${resData.message || "Unknown error"}`);
      }
    } catch (error: unknown) { // Remplace 'any' par 'unknown'
      // Vérification de type pour s'assurer que c'est une instance de Error
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
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(45deg,#000000,#183701,#010a58,#1b3b02)]">
      <div className="mt-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl p-6 max-w-md w-full animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#dfcea8" }}>
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
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
              value={formData.email}
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
              value={formData.password}
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
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <p className="mt-3 text-center text-base" style={{ color: "#dfcea8" }}>
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Global CSS pour l'animation */}
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
