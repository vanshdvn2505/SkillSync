"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import ProfilePage from "./edit-profile";

export default function EditProfile() {
  return (
    <div className="relative w-full h-screen text-accent">
      {/* Ensure ProfilePage is above everything */}
      <div className=" bg-transparent relative z-10">
        <ProfilePage />
      </div>
      
      {/* Background should be positioned correctly */}
      <div className="absolute inset-0 -z-50 pointer-events-none">
        <BackgroundBeams />
      </div>
    </div>
  );
}