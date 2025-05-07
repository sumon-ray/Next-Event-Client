"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { BookOpen, Home, Mail, Menu, Plus, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 

import img from "../../../public/favicon.png";
import "../../styles/styles.css";
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
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar */}

<AnimatePresence>
  {mobileMenuOpen && (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Dark blurred background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-50 bg-[#322f2f]  w-72 text-white p-5 shadow-xl "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <Image src={img} alt="Logo" width={40} height={40} />
          {/* Animated Close Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(false)}
            whileTap={{ rotate: 90, scale: 0.9 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Sidebar Links */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
          className="space-y-4 bg-[#322f2f]  h-screen text-base font-medium"
        >
          {[
            { label: "Home", href: "/", icon: Home },
            { label: "My Books", href: "/my-books", icon: BookOpen },
            { label: "Add Book", href: "/add-book", icon: Plus },
            { label: "Request", href: "/request", icon: Mail },
            { label: "Profile", href: "/profile", icon: User },
          ].map(({ label, href, icon: Icon }) => (
            <motion.li
              key={href}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Link
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-white"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )}
</AnimatePresence>

    </header>
  );
}
