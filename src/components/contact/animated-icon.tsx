"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedIconProps {
  icon: ReactNode
  color: string
  delay?: number
}

export default function AnimatedIcon({ icon, color, delay = 0 }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 },
      }}
      className={`bg-${color}-100 w-12 h-12 rounded-full flex items-center justify-center shadow-md`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className={`text-${color}-600`}
      >
        {icon}
      </motion.div>
    </motion.div>
  )
}
