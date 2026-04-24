"use client";

import { useAuth } from "@/context/Auth";
import { useLogoutMutation } from "@/store/api/auth/login";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const {user} = useAuth();
  const [logout, {isLoading}] = useLogoutMutation();
  const router = useRouter();
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try{
        await logout().unwrap();
        router.replace('/login');
    } catch(err){
        console.log(err);
    }
  };

  return (
    <div className="relative" ref={ref}>
      
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center 
        font-bold text-white cursor-pointer hover:scale-105 transition"
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-56 bg-black/40 backdrop-blur-lg 
          border border-white/10 rounded-xl shadow-xl p-4 flex flex-col gap-3 z-50"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >

          {/* User Info */}
          <div className="flex flex-col">
            <span className="text-blue-400 font-semibold text-sm">
              {user.name}
            </span>
            <span className="text-gray-400 text-xs truncate">
              {user.email}
            </span>
          </div>

          <div className="h-px bg-white/10"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 transition 
            rounded-lg py-2 text-sm text-white font-semibold"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
}