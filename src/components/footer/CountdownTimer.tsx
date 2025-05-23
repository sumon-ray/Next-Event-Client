"use client"

import { useState, useEffect } from "react"

const CountdownTimer = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    setCurrentTime(new Date())

    return () => clearInterval(timer)
  }, [])

  if (!currentTime) {
    // Prevent hydration mismatch
    return <div suppressHydrationWarning>Loading...</div>
  }

  const formatCountdownTime = () => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3)
    targetDate.setHours(18, 0, 0, 0)

    const diff = targetDate.getTime() - currentTime.getTime()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const countdown = formatCountdownTime()

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4" suppressHydrationWarning>
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center">
        <div className="text-2xl md:text-4xl font-bold text-white">{countdown.days}</div>
        <div className="text-xs md:text-sm text-slate-300">Days</div>
      </div>
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center">
        <div className="text-2xl md:text-4xl font-bold text-white">{countdown.hours}</div>
        <div className="text-xs md:text-sm text-slate-300">Hours</div>
      </div>
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center">
        <div className="text-2xl md:text-4xl font-bold text-white">{countdown.minutes}</div>
        <div className="text-xs md:text-sm text-slate-300">Minutes</div>
      </div>
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-2 md:p-4 text-center">
        <div className="text-2xl md:text-4xl font-bold text-white">{countdown.seconds}</div>
        <div className="text-xs md:text-sm text-slate-300">Seconds</div>
      </div>
    </div>
  )
}

export default CountdownTimer
