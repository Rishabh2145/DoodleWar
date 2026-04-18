import React from "react";
import { useRouter } from "next/navigation";

export default function Doodle() {
    const router = useRouter();
    return (
        <div className="flex w-1/3  text-center justify-center items-center" onClick={() => router.replace('/')}>
            <h1
                className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.9)] tracking-wider animate-[float_4s_ease-in-out_infinite] max-md:text-5xl"
                style={{ fontFamily: "Orbitron, sans-serif" }}
            >
                DoodleWar
            </h1>
        </div>
    );
}
