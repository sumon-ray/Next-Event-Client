"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  // ArrowRight,
  Award,
  Calendar,
  // CalendarDays,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  // Sparkles,
  Star,
  // Ticket,
  Twitter,
  Youtube,
} from "lucide-react";
// import dynamic from "next/dynamic";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
// const CountdownTimer = dynamic(() => import("../footer/CountdownTimer"), {
//   ssr: false,
// });
export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const categories = [
    { name: "Conferences", count: 120 },
    { name: "Workshops", count: 85 },
    { name: "Networking", count: 64 },
    { name: "Concerts", count: 93 },
    { name: "Exhibitions", count: 72 },
    { name: "Webinars", count: 108 },
  ];

  return (
    <footer className="pt-2 md:pt-0 md:mt-24 bg-gradient-to-r from-[#1E3A8A] via-[#4c8aef] to-[#1E293B] relative  dark:text-white">
      {/* Next big event countdown */}
      {/* <div className="relative z-10 mx-auto mt-10 px-4 max-w-6xl md:translate-y-24">
        <div className="font-bold tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-l from-[#1E3A8A] via-[#3B82F6] to-[#1E293B]  rounded-xl border border-slate-700 shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-xl md:text-2xl font-bold text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                Next Bignext Even
              </h3>
              <p className="text-blue-300 mt-2">Tech Innovation Summit 2023</p>
              <div className="flex items-center mt-1 text-sm text-slate-300">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>December 15-16, 2023</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-slate-300">
                <MapPin className="h-4 w-4 mr-1" />
                <span>New York Convention Center</span>
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                <Ticket className="h-4 w-4 mr-2" />
                Get Tickets
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            {/* <CountdownTimer /> */}
          {/* </div>
        </div>
      </div>  */}

      <div className=" container mx-auto items-center px-4 pt-14 pb-2  bt-4  ">
        {/* Main footer content */}
        <div className=" grid grid-cols-1 md:pt-20 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: About & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-300 ">nextEvent</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your premier platform for creating, discovering, and participating
              in events. From public gatherings to exclusive private functions,
              we make event management seamless.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-sm text-slate-300">
                  123 Event Plaza, Suite 400
                  <br />
                  New York, NY 10001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-slate-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-slate-300">contact@eventhub.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-slate-300">Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-6 ">
            <h3 className="text-slate-300  text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-400">
              Quick Links
            </h3>
            <ul className="space-y-3 flex-grow">
              {[
                { name: "Home", href: "/" },
                { name: "Browse Events", href: "/events" },
                { name: "Create Event", href: "/events/create" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "My Invitations", href: "/dashboard/invitations" },
                { name: "Pricing", href: "/pricing" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className=" text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-400 transform group-hover:translate-x-1 transition-transform duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Event Categories (replacing Recent Events) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-slate-300  text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-400">
              Event Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-slate-200 hover:bg-slate-200 backdrop-blur-sm rounded-lg p-3 transition-all duration-200 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-200">
                      {category.name}
                    </span>
                    <span className="bg-blue-500/20  text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Awards section */}
            <div className="mt-8">
              <h3 className="text-xl text-slate-300  font-semibold flex items-center mb-4">
                <Award className="h-5 w-5 mr-2 text-yellow-400 " />
                Our Awards
              </h3>
              <div className="flex gap-3">
                <div className="bg-slate-200  backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                  <div className="bg-yellow-500 p-1 rounded-full">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">Best Event Platform 2023</span>
                </div>
                <div className="bg-slate-200 backdrop-blur-sm rounded-lg p-3 flex items-center space-x-2">
                  <div className="bg-blue-500 p-1 rounded-full">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">Top Tech Startup 2022</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-slate-300  text-xl font-semibold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-400">
              Newsletter
            </h3>
            <p className="text-sm text-slate-300">
              Subscribe to our newsletter to receive updates on new events,
              special offers, and exclusive content.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 relative">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-slate-200 border-slate-700 text-white pr-12 focus:ring-blue-400 focus:border-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md h-8 w-8"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>

            <div className="pt-4">
              <h4 className="text-base font-medium mb-3 text-slate-300 ">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Youtube, href: "#", label: "YouTube" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="bg-slate-800 hover:bg-blue-500 text-white p-2 rounded-full transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and links */}
        <div className="mt-16 pt-3 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} nextEvent. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-white transition-colors duration-200"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
