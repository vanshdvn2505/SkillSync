"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import LoginFormDemo from "./Login";

export default function BackgroundBeamsDemo() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <LoginFormDemo />
      <BackgroundBeams />
    </div>
  );
}
