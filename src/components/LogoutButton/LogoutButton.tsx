"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-xl transition-colors border border-red-400/20"
    >
      <LogOut size={16} />
      Sair da Conta
    </button>
  );
}
