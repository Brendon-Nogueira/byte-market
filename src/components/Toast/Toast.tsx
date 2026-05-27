"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

export const Toast = ({ message, type = "success", onClose }: ToastProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // ativa a animação de entrada
    const enterTimeout = setTimeout(() => setIsAnimating(true), 50);
    
    //ativa a animação de saída 
    const exitTimeout = setTimeout(() => setIsAnimating(false), 2700);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, []);

  const icons = {
    success: <CheckCircle className="text-emerald-500 shrink-0" size={20} />,
    error: <AlertCircle className="text-red-500 shrink-0" size={20} />,
    info: <Info className="text-blue-500 shrink-0" size={20} />,
  };

  const bgStyles = {
    success: "border-emerald-500/20 bg-emerald-950/20 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200",
    error: "border-red-500/20 bg-red-950/20 dark:bg-red-950/40 text-red-800 dark:text-red-200",
    info: "border-blue-500/20 bg-blue-950/20 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200",
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border glass shadow-2xl transition-all duration-300 transform ${
        isAnimating
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-2 opacity-0 scale-95"
      } ${bgStyles[type]}`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <span className="text-sm font-semibold tracking-wide leading-snug">{message}</span>
      </div>
      <button
        onClick={() => {
          setIsAnimating(false);
          setTimeout(onClose, 300);
        }}
        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/10"
      >
        <X size={16} />
      </button>
    </div>
  );
};
