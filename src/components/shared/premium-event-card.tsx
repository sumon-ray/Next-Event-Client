"use client"

import { useState, useEffect } from "react"
import { CalendarDays, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import NextButton from "./NextButton"
// import NextButton from "./next-button"

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
    <div className="md:absolute z-10 max-w-6xl px-4 mx-auto -top-32 lg:left-[5%] lg:right-[5%]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 tracking-wide bg-gradient-to-br from-[#7171f4] via-blue-300/80 to-blue-200/90 backdrop-blur-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] border border-white/20 drop-shadow-sm decoration-transparent rounded-xl md:p-8 hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.4)] transition-all duration-300"
      >
        <div className="flex flex-col text-[#1E293B] items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0 md:mr-6">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center text-2xl font-bold tracking-wide text-transparent drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text md:text-3xl"
            >
              Upcoming Big Next Event
            </motion.h3>
            <p className="mt-4 text-lg font-medium text-slate-800">Tech Innovation Summit {new Date().getFullYear()}</p>
            <div className="flex items-center my-2 text-sm text-slate-700 backdrop-blur-sm">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>December 15-16, {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center my-2 text-sm text-slate-700 backdrop-blur-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Army Stadium, Banani, Dhaka</span>
            </div>
            <div className="flex items-center justify-center mt-6 md:justify-start">
              <NextButton name="Get Tickets" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 md:gap-4">
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
                className="p-2 text-center rounded-lg bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-lg border border-white/10 shadow-lg md:p-6 hover:from-slate-700/70 hover:to-slate-800/70 transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center text-2xl font-bold text-white md:text-4xl">
                  {item.value}
                </div>
                <div
                  className={`text-xs md:text-sm text-blue-100 ${item.label === "Mins" ? "-pl-4 md:-pl-0" : item.label === "Secs" ? "-pl-2 md:-pl-0" : ""}`}
                >
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
