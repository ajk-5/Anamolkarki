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
    <div className="w-full">
      <div className="card-surface w-full max-w-md p-6 sm:p-8 reveal">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-300 mb-1"
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
              className="input-field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-300 mb-1"
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
              className="input-field"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <p className="mt-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
