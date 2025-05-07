"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import img from "../../../public/favicon.png";
import "../../styles/styles.css";
import MobileSidebar from "../sidebar/MobileSidebar";
import NextButton from "./NextButton";
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* User Avatar & Menu Button */}
        <nav className="flex items-center gap-2">
          {user ? (
            <Link href="/profile/personal-info">
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-white transition">
                <AvatarImage src={user?.profileImage} alt="Profile" />
                <AvatarFallback>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <NextButton name="Login" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 ml-2 md:hidden"
          >
            {mobileMenuOpen ? (
              <Menu className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
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
