"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

import PremiumHero from "../../../components/contact/premium-hero"
import PremiumContactForm from "../../../components/contact/premium-contact-form"
import InteractiveMap from "../../../components/contact/interactive-map"
import SocialConnect from "../../../components/contact/social-connect"
import LiveChatWidget from "../../../components/contact/live-chat-widget"

export default function ContactPage() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <PremiumHero />

      {/* Contact Form Section */}
      <section id="contact-form" className="relative z-10 bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Form */}
              <div>
                <PremiumContactForm />
              </div>

              {/* Right Column - Map */}
              <div className="self-start sticky top-20">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h2 className="text-2xl font-bold mb-6">Visit Our Offices</h2>
                  <InteractiveMap />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connect Section */}
      <SocialConnect />

      {/* Live Chat Widget - Only render button initially */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {chatOpen ? (
            <LiveChatWidget onClose={() => setChatOpen(false)} />
          ) : (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setChatOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="pr-2">Chat with us</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
