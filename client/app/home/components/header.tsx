"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search, Menu } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur pl-40 pr-24 supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-18 h-9 pr-4" />
        </Link>

        {/* Navigation Links (Centered) */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-background lg:flex lg:relative lg:top-0 lg:w-auto lg:bg-transparent items-center space-y-4 lg:space-y-0 lg:space-x-6 text-sm font-medium lg:justify-center`}
        >
          <Link href="/" className="block px-4 lg:inline lg:px-0">
            Home
          </Link>
          <Link href="/about" className="block px-4 lg:inline lg:px-0">
            About
          </Link>
          <Link href="/profile" className="block px-4 lg:inline lg:px-0">
            Profile
          </Link>
          <Link href="/explore" className="block px-4 lg:inline lg:px-0">
            Explore
          </Link>
          <Link href="/your-communities" className="block px-4 lg:inline lg:px-0">
            Your Communities
          </Link>
        </nav>

        {/* Search Bar (Aligned to the Right) */}
        <div className="hidden lg:flex items-center space-x-4">
          <form className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-72"
            />
          </form>
        </div>

        {/* Hamburger Menu (Visible on Small Screens) */}
        <div className="lg:hidden">
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}