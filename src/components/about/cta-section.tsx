"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 })

  return (
    <section ref={ctaRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-blue-100 mb-8">
                  Have questions about our platform? Want to learn more about how EventHub can help you organize and
                  manage your events? Reach out to our team.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <p>contact@eventhub.com</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <p>123 Event Street, San Francisco, CA 94103</p>
                  </div>
                </div>

                <div className="mt-10 flex space-x-4">
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-gray-700 mb-8">
                  Join thousands of event organizers and participants on our platform today.
                </p>

                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 rounded-full h-14 text-lg"
                    >
                      <Link href="/register">
                        Create Your Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full h-14 text-lg"
                    >
                      <Link href="/events">Explore Events</Link>
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600">
                    Need help?{" "}
                    <a href="#" className="text-blue-600 font-medium hover:underline">
                      Chat with us
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
