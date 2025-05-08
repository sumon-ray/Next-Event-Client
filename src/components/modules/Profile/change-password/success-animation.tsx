"use client"

import { motion } from "framer-motion"
import { CheckCircle, ShieldCheck } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function SuccessAnimation() {
  // Trigger confetti effect when component mounts
  useEffect(() => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, times: [0, 0.6, 1] }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-full p-8 shadow-lg border border-green-200">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-3xl font-bold text-gray-900 mb-3"
      >
        Password Updated!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-sm mx-auto"
      >
        Your password has been changed successfully. Your account is now secure with your new credentials.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center items-center text-green-600 text-sm font-medium"
      >
        <ShieldCheck className="h-5 w-5 mr-2" />
        <span>Your account is now protected with a stronger password</span>
      </motion.div>

      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 5, ease: "easeInOut" }}
        className="h-1 bg-green-500 rounded-full mt-8 max-w-xs mx-auto"
      />
    </motion.div>
  )
}
