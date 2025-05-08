"use client"

import { motion } from "framer-motion"

interface PasswordStrengthMeterProps {
  strength: number
}

export default function PasswordStrengthMeter({ strength }: PasswordStrengthMeterProps) {
  const getStrengthColor = () => {
    if (strength <= 20) return "bg-red-500"
    if (strength <= 40) return "bg-orange-500"
    if (strength <= 60) return "bg-yellow-500"
    if (strength <= 80) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthBackground = () => {
    if (strength <= 20) return "bg-red-100"
    if (strength <= 40) return "bg-orange-100"
    if (strength <= 60) return "bg-yellow-100"
    if (strength <= 80) return "bg-blue-100"
    return "bg-green-100"
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((segment) => {
            const segmentThreshold = segment * 20
            const isActive = strength >= segmentThreshold - 19
            const isFilled = strength >= segmentThreshold

            return (
              <motion.div
                key={segment}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
                className={`h-1.5 w-8 rounded-full ${
                  isFilled ? getStrengthColor() : isActive ? getStrengthBackground() : "bg-gray-200"
                }`}
              />
            )
          })}
        </div>
      </div>

      <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getStrengthColor()} transition-all duration-500 ease-out`}
          initial={{ width: "0%" }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
