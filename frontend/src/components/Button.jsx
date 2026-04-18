import React from "react";
import { useRouter } from "next/navigation";

export default function Button(props) {
    const router = useRouter();
    return(
    <button
        className="relative px-20 py-4 text-lg font-semibold text-white rounded-xl 
bg-gradient-to-r from-blue-500 to-blue-700 
shadow-lg shadow-blue-500/30 
overflow-hidden group transition duration-300"
        onClick={() => router.push(props.link)}
    >
        {/* Glow Effect */}
        <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition duration-300"></span>

        {/* Shine Animation */}
        <span
            className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r 
  from-transparent via-white/30 to-transparent 
  group-hover:left-[100%] transition-all duration-700"
        ></span>

        {/* Button Text */}
        <span
            className="relative z-10 tracking-wide"
            style={{ fontFamily: "Orbitron, sans-serif" }}
        >
            {props.title}
        </span>
    </button>);
}
