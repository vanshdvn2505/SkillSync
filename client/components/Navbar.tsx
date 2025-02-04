"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Menu, X, Bell, Calendar, FileText, Flame, Moon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile" },
    { name: "Explore", path: "/explore" },
    { name: "Your Communities", path: "/your-communities" },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full border-[#464646] border-b-[1px] bg-foreground text-primary-foreground px-10">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="w-11 h-7 pr-4" />
          </Link>

          {/* Menu for large screens */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {tabs.map(({ name, path }) => (
              <Link
                key={path}
                href={path}
                className={`px-4 hover:text-accent text-muted py-1 ${
                  pathname === path ? "border-b-2 border-primary " : ""
                } transition-colors duration-300 hover:border-borderSecondary`}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Icons & Premium Button */}
        <div className="flex items-center space-x-6 relative">
          {/* Bell Icon */}
          <button
            onClick={() => router.push("/notifications")}
            aria-label="Notifications"
            className="p-2"
          >
            <Bell className="w-6 h-6 cursor-pointer hover:text-accent text-muted" />
          </button>

          {/* Avatar (Click to open profile popup) */}
          <div className="relative">
            <Avatar onClick={() => setProfileOpen(!profileOpen)} className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {profileOpen && (
              <div className="absolute left-2 right-0 mt-3 w-72 bg-foreground border-none shadow-black shadow-md rounded-lg p-4 flex flex-col space-y-4 border border-borderSecondary">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">@johndoe</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Access all features with a premium subscription.
                </p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center p-3 bg-popover rounded-md">
                    <Calendar className="w-5 h-5 mr-2 text-primary-foreground" />
                    <p className="text-sm text-primary-foreground">My Meetings</p>
                  </div>
                  <div className="flex items-center p-3 bg-popover rounded-md">
                    <FileText className="w-5 h-5 mr-2 text-primary-foreground" />
                    <p className="text-sm text-primary-foreground">My Tests</p>
                  </div>
                  <div className="flex items-center p-3 bg-popover rounded-md">
                    <Flame className="w-5 h-5 mr-2 text-primary-foreground" />
                    <p className="text-sm text-primary-foreground">Daily Streak</p>
                  </div>
                </div>
                <div className="border-t border-borderSecondary pt-4 flex flex-col space-y-2">
                  <Button className="flex items-center text-sm hover:text-primary bg-foreground" variant={"outline"}>
                    <Moon className="w-5 h-5 mr-2" /> Toggle Theme
                  </Button>
                  <Button className="flex items-center text-sm hover:text-destructive-foreground " variant={"destructive"}>
                    <LogOut className="w-5 h-5 mr-2" /> Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Premium Button */}
          <Button size="lg" variant="secondary" className="text-primary-foreground">
            Go Premium
          </Button>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-foreground text-primary-foreground flex flex-col text-left justify-start space-y-4 p-6 border-b border-[#464646]">
          {tabs.map(({ name, path }) => (
            <Link
              key={path}
              href={path}
              className="text-accent text-lg hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
