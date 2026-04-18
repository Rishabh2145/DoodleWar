"use client"
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/animation/bg.json";

export default function AnimateBg(){
    return (
        <Lottie
        animationData={animationData}
        loop={true}
        speed={0.5}
        className="absolute inset-0 w-screen h-screen object-cover opacity-70 -z-10  scale-220 -translate-y-125 max-md:-translate-y-0"
      />
    )
}