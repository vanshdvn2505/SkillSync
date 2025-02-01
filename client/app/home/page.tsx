"use client";

import { useEffect, useState } from "react";
import { SplashScreen } from "./components/splash-screen"
import {  Navbar } from "../../components/Navbar";
import LeftSidebar from "./components/left-sidebar";
import { MentorPosts } from "./components/mentor-posts";
import { RightSidebar } from "./components/right-sidebar";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2059); 
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col w-full bg-white ">
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