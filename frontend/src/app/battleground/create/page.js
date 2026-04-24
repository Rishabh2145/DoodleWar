"use client";

import Background from "@/components/AnimateBg";
import Button from "@/components/Button";
import Doodle from "@/components/Logo";
import UserMenu from "@/components/UserMenu";
import { useEffect, useState } from "react";
import { useAuth } from '@/context/Auth'



export default function Home() {
    const [roomCode, setRoomCode] = useState(0);
    const [players, setPlayers] = useState([null, null, null, null, null, null]);
    

    useEffect(() => {
    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit
    setRoomCode(code);
}, []);


    return (
        <div className="relative min-h-screen min-w-screen overflow-hidden">
            <Background />
            <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
                <div className="absolute top-10 right-10">
                    <UserMenu/>
                </div>
                <div className="flex flex-col h-screen w-screen justify-center gap-12 items-center">
                    <Doodle />
                    <div
                        className="w-full flex justify-center px-4"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                        <div
                            className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/10 
  rounded-2xl shadow-xl p-6 flex flex-col items-center gap-6"
                        >
                            {/* Room Code */}
                            <div className="text-center">
                                <p className="text-gray-400 text-sm">
                                    Room Code
                                </p>
                                <h2 className="text-3xl tracking-[0.3em] text-blue-400 font-bold">
                                    {roomCode}
                                </h2>
                            </div>

                            {/* Players Grid */}
                            <div className="grid grid-cols-3 gap-4 w-full">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-36 rounded-xl flex items-center justify-center 
          bg-white/10 border border-white/10"
                                    >
                                        {players[i] ? (
                                            <span className="text-white font-semibold">
                                                {players[i]}
                                            </span>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Button title='Start Game' link='/battleground/playfriend'/>
                </div>
            </div>
        </div>
    );
}
