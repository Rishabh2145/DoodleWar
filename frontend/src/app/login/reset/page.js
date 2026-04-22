"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Background from "@/components/AnimateBg";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setStatus("Passwords do not match");
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setStatus(data.message || "Something went wrong");
      }

      setStatus("Password reset successfully ✅");

      // redirect after 2 sec
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      setStatus("Error resetting password");
    }
  };

  useEffect(() => {
    if (!token) {
      setStatus("Invalid or missing token");
    }
  }, [token]);

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
            Reset Password
          </h1>

          {/* Status Message */}
          {status && (
            <p className="text-center text-sm text-red-400">{status}</p>
          )}

          {/* Form */}
          {!status.includes("successfully") && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border border-white/20 rounded-xl py-3 px-4 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/10 border border-white/20 rounded-xl py-3 px-4 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 transition rounded-xl py-3 
                text-white font-semibold shadow-lg"
              >
                Reset Password
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}