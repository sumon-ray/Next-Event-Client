"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ParallaxMap() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Remove complex parallax effects
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500) // Reduced timeout

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={mapRef} className="relative w-full h-full overflow-hidden">
      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
        </div>
      )}

      {/* Map iframe */}
      <div className={`w-full h-full transition-opacity duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}>
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

        {/* Simplified map pin */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%-24px)] z-10 cursor-pointer transition-opacity duration-500 ${
            mapLoaded ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setShowInfo(!showInfo)}
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
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
          <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-blue-600 mx-auto -mt-[1px]"></div>
        </div>

        {/* Info window */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(100%+100px)] z-20"
            >
              <div className="bg-white p-6 rounded-lg shadow-2xl w-72">
                <h3 className="font-bold text-lg mb-2">Company Headquarters</h3>
                <p className="text-gray-600 mb-4">123 Business Avenue, San Francisco, CA 94107</p>
                <div className="flex justify-between">
                  <a
                    href="https://maps.google.com/?q=San+Francisco,+CA+94107"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Get Directions
                  </a>
                  <button onClick={() => setShowInfo(false)} className="text-gray-500 hover:text-gray-700">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
