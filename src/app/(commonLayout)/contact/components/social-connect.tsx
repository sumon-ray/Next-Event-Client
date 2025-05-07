"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Facebook, Instagram, Github, MessageCircle, Video, CalendarCheck } from "lucide-react"

export default function SocialConnect() {
  const socialLinks = [
    {
      icon: <Linkedin className="h-6 w-6" />,
      url: "https://linkedin.com",
      name: "LinkedIn",
      color: "#0A66C2",
      delay: 0,
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      url: "https://twitter.com",
      name: "Twitter",
      color: "#1DA1F2",
      delay: 0.1,
    },
    {
      icon: <Facebook className="h-6 w-6" />,
      url: "https://facebook.com",
      name: "Facebook",
      color: "#1877F2",
      delay: 0.2,
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      url: "https://instagram.com",
      name: "Instagram",
      color: "#E4405F",
      delay: 0.3,
    },
    {
      icon: <Github className="h-6 w-6" />,
      url: "https://github.com",
      name: "GitHub",
      color: "#181717",
      delay: 0.4,
    },
  ]

  const contactMethods = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      action: "Start a conversation",
      url: "#",
      color: "bg-blue-600",
      delay: 0,
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Call",
      description: "Schedule a face-to-face meeting",
      action: "Book a call",
      url: "#",
      color: "bg-purple-600",
      delay: 0.1,
    },
    {
      icon: <CalendarCheck className="h-6 w-6" />,
      title: "Schedule Meeting",
      description: "Find a time that works for you",
      action: "Check availability",
      url: "#",
      color: "bg-emerald-600",
      delay: 0.2,
    },
  ]

  return (
    <section className="md:mb-28 relative py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Section title */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Connect With Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Follow us on social media or choose your preferred way to reach out
            </motion.p>
          </div>

          {/* Social media icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: social.delay + 0.3 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative p-5 bg-white rounded-full shadow-lg transition-all duration-300 border border-gray-100 group"
                style={{ color: social.color }}
              >
                {/* Icon */}
                {social.icon}

                {/* Tooltip */}
                <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-sm py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Alternative contact methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: method.delay + 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div
                    className={`${method.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 text-white`}
                  >
                    {method.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{method.title}</h3>
                  <p className="text-slate-600 mb-4">{method.description}</p>
                  <a href={method.url} className="text-blue-600 font-medium flex items-center hover:underline">
                    {method.action}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
