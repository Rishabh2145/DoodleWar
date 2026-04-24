"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyMutation } from "@/store/api/auth/login";
import Background from "@/components/AnimateBg";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [verifyEmail] = useVerifyMutation();
  const [status, setStatus] = useState("loading"); 
  // loading | success | error

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token).unwrap();
        setStatus("success");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative z-10 flex items-center justify-center min-h-screen text-white px-4">
        <div
          className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/10 
          rounded-2xl shadow-xl p-6 flex flex-col items-center gap-6 text-center"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >

          {/* 🔄 Loading */}
          {status === "loading" && (
            <>
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-300">Verifying your account...</p>
            </>
          )}

          {/* ✅ Success */}
          {status === "success" && (
            <>
              <div className="text-green-400 text-5xl animate-bounce">✔</div>
              <p className="text-lg font-semibold">Verification Successful!</p>
              <p className="text-sm text-gray-400">
                Redirecting to login...
              </p>
            </>
          )}

          {/* ❌ Error */}
          {status === "error" && (
            <>
              <div className="text-red-400 text-5xl">✖</div>
              <p className="text-lg font-semibold">Verification Failed</p>
              <p className="text-sm text-gray-400">
                Invalid or expired token
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}