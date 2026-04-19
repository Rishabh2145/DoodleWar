"use client";

import Background from "@/components/AnimateBg";
import { useState, useEffect, useRef } from "react";

export default function WarPage() {
    const [assignWord, setAssignWord] = useState("Apple");
    const [prediction, setPrediction] = useState("Apple");
    const chatRef = useRef(null);
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [tool, setTool] = useState("pen"); 

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const scale = window.devicePixelRatio;

        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;

        ctx.scale(scale, scale);

        ctx.lineCap = "round";
        ctx.lineWidth = 4;
    }, []);

    const startDrawing = (e) => {
        setDrawing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const startDrawingTouch = (e) => {
        e.preventDefault();
        setDrawing(true);
        drawTouch(e);
    };

    const stopDrawing = () => {
        setDrawing(false);
    };

    const draw = (e) => {
        if (!drawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.strokeStyle = tool === "pen" ? "black" : "white";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const drawTouch = (e) => {
        if (!drawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ctx.strokeStyle = tool === "pen" ? "black" : "white";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="relative min-h-screen min-w-screen max-w-screeb max-h-screen overflow-hidden">
            <Background />

            <div
                className="min-h-screen text-white flex flex-col"
                style={{ fontFamily: "Orbitron, sans-serif" }}
            >
                {/* HEADER */}
                <header className="flex justify-between items-center px-4 md:px-6 py-4 border-b border-white/10 bg-black/20 backdrop-blur-md">
                    <h1 className="text-xl md:text-2xl font-bold">DoodleWar</h1>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                            U
                        </div>
                    </div>
                </header>

                {/* MAIN */}
                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                    {/* LEFT TOOLBAR */}
                    <aside className="w-full md:w-20 flex  md:flex-col justify-center items-center gap-4 md:gap-6 py-3 md:py-6 bg-black/20 backdrop-blur-md border-b md:border-b-0 md:border-r border-white/10">
                        <button
                            className={`w-10 h-10 md:w-12 md:h-12  rounded-xl hover:bg-blue-500/30 transition ${tool == "pen" ? "bg-blue-500/30" : "bg-white/10"}`}
                            onClick={() => setTool("pen")}
                        >
                            ✏️
                        </button>

                        <button
                            className={`w-10 h-10 md:w-12 md:h-12  rounded-xl hover:bg-blue-500/30 transition ${tool == "eraser" ? "bg-blue-500/30" : "bg-white/10"}`}
                            onClick={() => setTool("eraser")}
                        >
                            🧽
                        </button>

                        <button
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl hover:bg-red-500/30 transition"
                            onClick={clearCanvas}
                        >
                            🔄
                        </button>
                    </aside>

                    {/* CANVAS */}
                    <main className="flex-1 flex flex-col items-center justify-center px-2  md:p-6 gap-4">
                        {/* WORD */}
                        <div className=" flex justify-around items-center w-full max-w-xl bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4 text-center text-sm md:text-base">
                            <p>
                                Word:{" "}
                                <span className="text-blue-400">
                                    {assignWord}
                                </span>
                            </p>
                            <div className="text-center h-10 flex justify-center items-center  md:p-4 text-md md:text-xl font-bold">
                                ⏱ 30s
                            </div>
                        </div>

                        {/* CANVAS BOX */}
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onMouseMove={draw}
                            onTouchStart={startDrawingTouch}
                            onTouchEnd={stopDrawing}
                            onTouchCancel={stopDrawing}
                            onTouchMove={drawTouch}
                            className="w-full max-w-5xl h-[250px] md:h-[400px] lg:h-[500px] bg-white rounded-xl shadow-lg cursor-crosshair"
                        />

                        {/* PREDICTION */}
                        <div className="w-full max-w-xl bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-3 md:p-4 text-center text-sm md:text-base">
                            Prediction:{" "}
                            <span className="text-blue-400">{prediction}</span>
                        </div>
                    </main>
                </div>

                {/* FOOTER */}
                <footer className="text-center py-2 md:py-3 text-xs md:text-sm text-gray-400 border-t border-white/10 bg-black/20">
                    Need help?{" "}
                    <a href="mailto:rishabh064.nitsri@gmail.com">
                        Contact Support
                    </a>
                </footer>
            </div>
        </div>
    );
}
