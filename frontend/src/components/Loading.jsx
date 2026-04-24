"use client";

import Background from "@/components/AnimateBg";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* 🔥 Animated Background */}
      <Background />

      {/* 🔹 Overlay Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
        
        <div
          className="flex flex-col items-center gap-6 bg-black/30 backdrop-blur-lg 
          border border-white/10 rounded-2xl px-8 py-6 shadow-xl"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >

          {/* Spinner */}
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-blue-500/30"></div>
            <div className="absolute top-0 left-0 w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>

          {/* Text */}
          <p className="text-blue-400 text-sm md:text-base tracking-wider animate-pulse">
            {text}
          </p>

        </div>

      </div>
    </div>
  );
}