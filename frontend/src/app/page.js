"use client";

import Background from "@/components/AnimateBg";
import { useRouter } from "next/navigation";
import Doodle from "@/components/Logo";
import Button from "@/components/Button";

export default function Home() {
  const router = useRouter();
    return (
        <div className="relative min-h-screen overflow-hidden">
            <Background />
            <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
                <div className="flex flex-col h-screen w-screen justify-center gap-12 items-center">
                    <Doodle/>
                    <Button title='Start' link='/login'/>
                </div>
            </div>
        </div>
    );
}
