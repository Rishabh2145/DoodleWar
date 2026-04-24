// components/ToastProvider.jsx
"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
    return (
        <ToastContainer
            toastClassName={() =>
                "backdrop-blur-lg bg-blue-500/20 border border-white/20 text-white rounded-xl"
            }
        />
    );
}
