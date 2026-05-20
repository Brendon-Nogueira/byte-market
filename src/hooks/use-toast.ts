"use client";

import { useContext } from "react";
import { ToastContext } from "../providers/toast-provider";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um ToastProvider");
  }
  return context;
};
