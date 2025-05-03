"use client";

import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

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

import { useUser } from "@/context/UserContext";;
import img from "../../../public/favicon.png";
import NextButton from "./NextButton";
import "../../styles/styles.css";
import { logOut } from "@/services/AuthService";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    setUser(null);
    toast.success("Log out successfully");
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-black/20">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto md:px-8">
       
        <Link href="/" className="flex items-center">
          <Image
            src={img}
            alt="Logo"
            width={1000}
            height={1000}
            className="w-20 rounded-md"
          />
        </Link>

     
        <ul className="hidden gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="navButton !bg-slate-50/10 ">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

   
        <nav className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profileImage} alt="Profile" />
                  <AvatarFallback>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                  <LogOut className="mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <NextButton name="Login" />
            </Link>
          )}

      
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 ml-2 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

 
      {mobileMenuOpen && (
        <div className="absolute w-full px-4 py-4 transition-all md:hidden bg-black/80 backdrop-blur-md">
          <ul className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-white transition rounded hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
