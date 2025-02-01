"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../app/home/components/ui/input";
import { Search, Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile" },
    { name: "Explore", path: "/explore" },
    { name: "Your Communities", path: "/your-communities" },
  ]
  
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-[#464646] border-b-[1px] bg-foreground text-primary-foreground px-10">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute w-full bg-background lg:flex lg:relative lg:top-0 lg:w-auto lg:bg-transparent items-center space-y-4 lg:space-y-0 lg:space-x-6 text-sm font-medium lg:justify-center`}
        >
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-10 h-9 pr-4" />
          </Link>

          {tabs.map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className={`block px-4 lg:inline lg:px-0 text-accent hover:text-primary ${
                pathname === path ? "border-b-2 border-primary" : "border-transparent"
              } transition-colors duration-300 hover:border-borderSecondary`}
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-2 items-center">
            <div className="flex justify-evenly items-center">
              <Bell />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Button size={"lg"} variant={"secondary"} className="text-primary">Premium</Button>
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