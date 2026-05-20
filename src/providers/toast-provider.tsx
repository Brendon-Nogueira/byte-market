"use client";

import React, { createContext, useState, useCallback } from "react";
import { Toast, ToastType } from "../components/Toast/Toast";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

   
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* mensagens renderizadas no canto superior direito */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full sm:w-80">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
