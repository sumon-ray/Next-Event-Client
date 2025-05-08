"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SocialIconProps {
  icon: ReactNode
  href: string
  label: string
  delay?: number
}

export default function SocialIcon({ icon, href, label, delay = 0 }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: delay + 0.2 }}>
        {icon}
      </motion.div>
    </motion.a>
  )
}
