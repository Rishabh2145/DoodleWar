"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Background from "@/components/AnimateBg";
import { useResetMutation } from "@/store/api/auth/forgot";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const pass = useFormik({
    initialValues: {
      password: "",
      token
    },
    enableReinitialize: true,
    onSubmit: async (values, {resetForm}) => {
      if(values.password != confirmPassword){
        return setStatus("Passwords do not match");
      }
      try{
        const res = await reset(values).unwrap();
        toast.success(res?.data?.message);
        router.replace('/login');
      } catch (err){
        console.log(err);
        toast.error(err?.data?.message);
        setStatus(err?.data?.message || "Something went wrong!");
      }
    }
  })
  const [reset, {isLoading}] = useResetMutation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");


  useEffect(() => {
    if (!token) {
      setStatus("Invalid or missing token");
    }
  }, [token]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative z-10 flex items-center justify-center min-h-screen text-white px-4">
        
        <div
          className="w-full max-w-md bg-black/30 backdrop-blur-lg border border-white/10 
          rounded-2xl shadow-xl p-6 flex flex-col gap-6"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-400">
            Reset Password
          </h1>

          {/* Status Message */}
          {status && (
            <p className="text-center text-sm text-red-400">{status}</p>
          )}

          {/* Form */}
          {!status.includes("successfully") && (
            <form onSubmit={pass.handleSubmit} className="flex flex-col gap-4">

              <input
                type="password"
                placeholder="New Password"
                name="password"
                onChange={pass.handleChange}
                required
                className="bg-white/10 border border-white/20 rounded-xl py-3 px-4 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/10 border border-white/20 rounded-xl py-3 px-4 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 transition rounded-xl py-3 
                text-white font-semibold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." :'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}