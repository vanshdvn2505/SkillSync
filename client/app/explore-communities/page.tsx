'use client'

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/Navbar"
import ExploreCommunities from "./components/explore-communities"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
];

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
};

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-evenly items-center text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-foreground">Explore Communities</h1>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
        <Suspense fallback={<ExploreSkeleton />}>
          <ExploreCommunities />
        </Suspense>
      </main>
    </div>
  )
}

function ExploreSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-64 w-full" />
      ))}
    </div>
  )
}

