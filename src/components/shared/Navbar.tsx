"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { logOut } from "@/services/AuthService/getCurrentUser";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, setUser, isLoading} = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleLogOut = () => {
    logOut();
    setUser(null);
    toast.success("Log out successfully");
    router.push("/login");
  };

  return (
    <>
      <header className="border-b container flex justify-between items-center mx-auto ">
        <div className="container flex justify-between items-center mx-auto h-16 px-3">
          {/* Brand */}
          <div className="flex gap-2">
            <button className="md:hidden" onClick={() => setOpen(true)}>
              <Menu />
            </button>
            <h1 className="md:text-2xl font-black flex items-center">
              nextEvent
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-4 flex-grow justify-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-black font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <nav className="flex gap-2 items-center ">
            <div className="hidden md:flex">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user?.profileImage} alt="Profile" />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mx-auto">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>My Shop</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogOut}>
                      <LogOut className="mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="rounded-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* // mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <nav className="flex gap-2 items-center">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user?.profileImage} alt="Profile" />
                    <AvatarFallback>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mx-auto">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <ul className="flex flex-col p-4 gap-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-700 hover:text-black"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t">
          {user ? (
            <>
              <Button
                onClick={() => {
                  handleLogOut();
                  setOpen(false);
                }}
                variant="outline"
                className="w-full"
              >
                <LogOut className="mr-2" size={16} />
                Log out
              </Button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
