"use client";

import { useState } from "react";
import Background from "@/components/AnimateBg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 Call backend API here later
    console.log("Send reset link to:", email);

    setSent(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative z-10 flex items-center justify-center min-h-screen text-white px-4">
        
        <div
          className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/10 
          rounded-2xl shadow-xl p-6 flex flex-col gap-6"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-400">
            Forgot Password
          </h1>

          {!sent ? (
            <>
              {/* Description */}
              <p className="text-gray-400 text-center text-sm">
                Enter your email and we’ll send you a reset link
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border border-white/20 rounded-xl py-3 px-4 
                  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 transition rounded-xl py-3 
                  text-white font-semibold shadow-lg"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <p className="text-green-400 font-semibold">
                ✅ Reset link sent!
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check your email to reset your password
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}