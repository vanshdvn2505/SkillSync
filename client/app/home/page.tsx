"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "./components/splash-screen"
import {  Navbar } from "../../components/Navbar";
import LeftSidebar from "./components/left-sidebar";
import { MentorPosts } from "./components/mentor-posts";
import { RightSidebar } from "./components/right-sidebar";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";

export default function Home() {
    
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen min-w-screen flex flex-col w-full bg-background ">
      <Navbar />
      <main className="flex-1 container mx-auto mt-6">
        <div className="flex">
          <div className="lg:block hidden">
            <LeftSidebar />
          </div>
          <div className="w-full flex flex-col justify-center items-center overflow-hidden h-screen scrollbar-hidden">
            <MentorPosts />
          </div>
          <div className="lg:block hidden">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}