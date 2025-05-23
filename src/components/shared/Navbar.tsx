"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useUser } from "@/context/UserContext";
import "../../styles/styles.css";
import MobileSidebar from "../MobileSidebar/MobileSidebar";
import NextButton from "./NextButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, isLoading } = useUser();
  // console.log(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm backdrop-blur-sm bg-black/20">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src='/favicon.png'
            alt="Logo"
            width={1000}
            height={1000}
            className="w-20 rounded-md"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="navButton !bg-slate-50/10">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Actions & Mobile Toggle */}
        <nav className="flex items-center gap-2">
          {!isLoading &&
            (user ? (
              <>
                {user.role === "ADMIN" ? (
                  <Link href="/admin/dashboard">
                    <NextButton name="Dashboard" />
                  </Link>
                ) : (
                  <Link href="/profile/personal-info" className="relative">
                    <Avatar className="cursor-pointer ring-2 ring-blue-500 hover:ring-4 transition duration-300">
                      <AvatarImage src={user.profileImage} alt="Profile" />
                      <AvatarFallback>
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login">
                <NextButton name="Login" />
              </Link>
            ))}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 ml-2 md:hidden"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}