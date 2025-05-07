"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ContactMap() {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
        </div>
      )}

      {/* Map iframe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mapLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0508274415486!2d-122.41941548468204!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858093edc3fa35%3A0x4e93a317e0a02d9c!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Location"
          className="grayscale hover:grayscale-0 transition-all duration-500"
          onLoad={() => setMapLoaded(true)}
        ></iframe>

        {/* Map pin */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%-24px)] z-10 pointer-events-none"
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: [0, -15, 0],
            opacity: mapLoaded ? 1 : 0,
          }}
          transition={{
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
              repeatType: "reverse",
            },
            opacity: { duration: 0.3, delay: 0.5 },
          }}
        >
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-blue-600 mx-auto -mt-[1px]"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}
