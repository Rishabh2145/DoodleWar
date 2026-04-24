"use client";

import React, { useState } from "react";
import Background from "@/components/AnimateBg";
import { useRouter } from "next/navigation";
import Doodle from "@/components/Logo";
import Button from "@/components/Button";
import UserMenu from "@/components/UserMenu";

export default function Home() {
    const router = useRouter();
    const [mode, setMode] = useState("join");
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Background />
            <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
                <div className="absolute top-10 right-10">
                    <UserMenu />
                </div>
                <div className="flex flex-col h-screen w-screen justify-center gap-12 items-center">
                    <Doodle />
                    <div className="w-4/5 flex justify-around px-4 mt-6 max-md:w-8/9">
                        <div
                            className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/10 
    rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center gap-8 "
                            style={{ fontFamily: "Orbitron, sans-serif" }}
                        >
                            {/* State buttons */}
                            <div className="flex w-full justify-between gap-4">
                                <button
                                    onClick={() => setMode("join")}
                                    className={`flex-1 py-3 rounded-xl text-sm md:text-base transition 
        ${mode === "join" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                                >
                                    Join Room
                                </button>

                                <button
                                    onClick={() => setMode("create")}
                                    className={`flex-1 py-3 rounded-xl text-sm md:text-base transition 
        ${mode === "create" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                                >
                                    Create Room
                                </button>

                                <button
                                    onClick={() => setMode("solo")}
                                    className={`flex-1 py-3 rounded-xl text-sm md:text-base transition 
        ${mode === "solo" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"}`}
                                >
                                    Solo
                                </button>
                            </div>

                            {/* Join Room Input */}
                            {mode === "join" && (
                                <div className="w-full flex flex-col items-center gap-8 animate-fadeIn">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        placeholder="Enter 6-digit code"
                                        className="w-full text-center tracking-[0.5em] text-lg md:text-xl 
          bg-white/10 border border-white/20 rounded-xl py-3 px-4 
          text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />

                                    <Button
                                        title="Join Room"
                                        link="/battleground/create"
                                    />
                                </div>
                            )}

                            {/* Create Room */}
                            {mode === "create" && (
                                <div className="w-full flex flex-col items-center gap-8 animate-fadeIn">
                                    <p className="text-gray-300 text-sm text-center">
                                        Create a room and invite your friends
                                    </p>

                                    <Button
                                        title="Create Room"
                                        link="/battleground/create"
                                    />
                                </div>
                            )}

                            {/* Solo */}
                            {mode === "solo" && (
                                <div className="w-full flex flex-col items-center gap-8 animate-fadeIn">
                                    <p className="text-gray-300 text-sm text-center">
                                        Play instantly without joining a room
                                    </p>

                                    <Button
                                        title="Start Solo"
                                        link="/battleground/solo"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
