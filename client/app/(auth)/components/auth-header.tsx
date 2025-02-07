"use client"

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AuthHeader() {
  const router = usePathname();

  return (
    <header className="w-full bg-white dark:bg-zinc-900 shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50 ">
      <div className="flex items-center space-x-2">
      <img src="/logo.png" alt="Logo" className="w-11 h-7 pr-4" />
        <span className="text-2xl font-bold text-primary">SkillSync</span>
      </div>
      <nav className="hidden md:flex space-x-4">
        <Link 
          href="/login" 
          className={cn(
            "text-sm px-3 py-2 rounded transition-all", 
            router === "/login" ? "bg-primary text-accent" : "text-muted hover:bg-popover"
          )}
        >
          Login
        </Link>
        <Link 
          href="/signup" 
          className={cn(
            "text-sm px-3 py-2 rounded transition-all", 
            router === "/signup" ? "bg-primary text-accent" : "text-muted hover:bg-popover"
          )}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
