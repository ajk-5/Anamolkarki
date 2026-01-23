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
    <div className="w-full">
      <div className="card-surface w-full max-w-md p-6 sm:p-8 reveal">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-slate-300 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
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
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-semibold text-slate-300 mb-1"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
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
            {loading ? "Registering..." : "Register"}
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
