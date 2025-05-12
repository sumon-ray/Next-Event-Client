"use client"

import { useState, useEffect } from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import NextButton from "./NextButton"

interface CountdownType {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function PremiumEventCard() {
  const [countdown, setCountdown] = useState<CountdownType>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date(`December 15, ${new Date().getFullYear()} 00:00:00`).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(interval)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative my-20 z-10 py-10 px-4 mx-auto overflow-hidden  max-w-full">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-[url('/images/img1.jpg')] bg-cover bg-center"
            style={{ filter: "brightness(0.9)" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-blue-900/30 to-slate-900/40 backdrop-blur-sm"></div>
        </div>

        {/* Content container with glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-6 md:p-8 tracking-wide bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_50px_rgba(90,_90,_255,_0.3)] rounded-xl hover:shadow-[0_20px_70px_rgba(90,_90,_255,_0.4)] transition-all duration-500"
        >
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0 md:mr-6">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center text-2xl font-bold tracking-wide text-transparent drop-shadow-sm bg-gradient-to-r from-blue-200 via-indigo-100 to-white bg-clip-text md:text-3xl"
              >
                Upcoming Big Next Event
              </motion.h3>
              <p className="mt-4 text-lg font-medium text-white/90">Tech Innovation Summit {new Date().getFullYear()}</p>
              <div className="flex items-center my-2 text-sm text-white/80">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>December 15-16, {new Date().getFullYear()}</span>
              </div>
              <div className="flex items-center my-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Army Stadium, Banani, Dhaka</span>
              </div>
              <div className="flex items-center justify-center mt-6 md:justify-start">
                <NextButton name="Get Tickets" />
              </div>
            </div>

            {/* Countdown timer with glassmorphism */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 w-full max-w-md">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Mins" },
                { value: countdown.seconds, label: "Secs" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="group p-2 text-center rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] md:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center text-2xl font-bold text-white md:text-4xl group-hover:text-blue-200 transition-colors duration-300">
                    {item.value}
                  </div>
                  <div
                    className={`text-xs md:text-sm text-blue-100/80 ${
                      item.label === "Mins"
                        ? "-pl-4 md:pl-0"
                        : item.label === "Secs"
                        ? "-pl-2 md:pl-0"
                        : ""
                    }`}
                  >
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  )
}
