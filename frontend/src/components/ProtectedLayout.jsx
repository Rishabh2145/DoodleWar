"use client";

import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./Loading";

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading) return <Loading/>;

  if (!user) return null;

  return children;
}