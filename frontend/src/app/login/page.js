"use client";

import React, { useState } from "react";
import Background from "@/components/AnimateBg";
import Doodle from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useLoginMutation } from "@/store/api/auth/login";
import { toast } from "react-toastify";

export default function Page() {
    const [isLogin, setIsLogin] = useState(true);
    const [login, { isLoading }] = useLoginMutation();
    const router = useRouter();
    const cred = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        enableReinitialize: true,
        onSubmit : async (value, {resetForm}) => {
            try{
                const res = await login(value).unwrap();
                console.log(res);
                toast.success(res.message || "Login successful ✅");
                router.replace('/battleground/create');
                resetForm();
            }catch(err){
                console.log(err);
                toast.error(err?.data?.message || "Invalid credentials ❌");
            }
        }
    });

    const register = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    return (
        <div className="relative min-h-screen overflow-hidden max-md:flex max-md:flex-col">
            <Background />
            <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
                <div className="flex h-screen w-screen justify-center gap-20 items-center max-md:flex max-md:flex-col max-md:justify-start max-md:gap-5">
                    <div className="flex h-4/5 w-1/3  text-center justify-center items-center max-md:h-50">
                        <Doodle />
                    </div>
                    <div className="flex w-2/5 bg-black/20 backdrop-blur-md shadow-xl rounded-xl border border-white/10 justify-center items-center max-md:w-8/9 py-12 max-md:py-8">
                        <div className="w-full flex flex-col items-center">
                            {/* Top Toggle */}
                            <div className="relative flex bg-white/10 rounded-full p-1 mb-10 w-[320px]">
                                {/* Sliding Pill */}
                                <div
                                    className={`absolute top-1 left-1 h-[calc(100%-8px)] w-1/2 rounded-full bg-blue-500/80 transition-all duration-300 ${
                                        !isLogin ? "translate-x-full" : ""
                                    }`}
                                />

                                <button
                                    onClick={() => setIsLogin(true)}
                                    className={`w-1/2 z-10 py-3 text-lg font-semibold transition ${
                                        isLogin ? "text-white" : "text-gray-300"
                                    }`}
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => setIsLogin(false)}
                                    className={`w-1/2 z-10 py-3 text-lg font-semibold transition ${
                                        !isLogin
                                            ? "text-white"
                                            : "text-gray-300"
                                    }`}
                                >
                                    Signup
                                </button>
                            </div>

                            {/* Forms */}
                            <div className="w-full flex justify-center">
                                {isLogin ? (
                                    <form
                                        className="w-[70%] flex flex-col gap-5 max-md:w-[90%]"
                                        onSubmit={cred.handleSubmit}
                                    >
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            onChange={cred.handleChange}
                                            className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={cred.handleChange}
                                            className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <button
                                            type="submit"
                                            className="mt-4 bg-blue-500 hover:bg-blue-600 transition rounded-xl py-3 text-lg text-white font-semibold shadow-lg"
                                        >
                                            Login
                                        </button>
                                    </form>
                                ) : (
                                    <form
                                        className="w-[70%] flex flex-col gap-5 max-md:w-[90%]"
                                        onSubmit={(e) => {
                                            e.preventDefault;
                                            router.replace("/battleground");
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />

                                        <button
                                            type="submit"
                                            className="mt-4 bg-blue-500 hover:bg-blue-600 transition rounded-xl py-3 text-lg text-white font-semibold shadow-lg"
                                        >
                                            Signup
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
