"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function InteractiveMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  // const mapRef = useRef<HTMLDivElement>(null);

  const locations = [
    {
      id: "hq",
      name: "Headquarters",
      address: "123 Business Avenue, San Francisco, CA 94107",
      phone: "+1 (555) 123-4567",
      email: "contact@company.com",
      position: { top: "40%", left: "35%" },
      color: "#3b82f6" 
    },
    {
      id: "branch1",
      name: "New York Office",
      address: "456 Madison Avenue, New York, NY 10022",
      phone: "+1 (555) 987-6543",
      email: "nyoffice@company.com",
      position: { top: "30%", left: "55%" },
      color: "#10b981" 
    },
    {
      id: "branch2",
      name: "London Office",
      address: "789 Oxford Street, London, W1D 3QG, UK",
      phone: "+44 20 1234 5678",
      email: "london@company.com",
      position: { top: "25%", left: "75%" },
      color: "#8b5cf6" 
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-slate-900">
      {/* Loading state */}
      <AnimatePresence>
        {!mapLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900 flex items-center justify-center z-30"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200/20 rounded-full animate-spin mb-4"></div>
              <p className="text-white/80">Loading map...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/10 z-10 pointer-events-none"></div>

      {/* Map iframe with custom styling */}
      <div className="w-full h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0508274415486!2d-122.41941548468204!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858093edc3fa35%3A0x4e93a317e0a02d9c!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Locations"
          className="grayscale contrast-125 brightness-75 transition-all duration-700 hover:grayscale-0 hover:contrast-100 hover:brightness-100"
          onLoad={() => setMapLoaded(true)}
        ></iframe>
      </div>

      {/* Custom office location markers */}
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute z-20"
          style={{ 
            top: location.position.top, 
            left: location.position.left 
          }}
        >
          <motion.button
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              y: activeMarker === location.id ? [-8, 0, -8] : 0 
            }}
            transition={{ 
              scale: { duration: 0.5, delay: mapLoaded ? 0.3 : 1 },
              y: { repeat: activeMarker === location.id ? Infinity : 0, duration: 1.5 } 
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setActiveMarker(location.id);
              setShowInfo(true);
            }}
            className="group relative focus:outline-none"
            style={{ transformOrigin: "bottom center" }}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10 relative"
              style={{ backgroundColor: location.color }}
            >
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div 
              className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] mx-auto -mt-[1px]"
              style={{ borderTopColor: location.color }}
            ></div>
            
            {/* Pulse animation */}
            <div 
              className="absolute -inset-4 rounded-full animate-ping opacity-30 -z-10"
              style={{ backgroundColor: location.color }}
            ></div>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white text-slate-900 px-3 py-1 rounded-md text-sm font-medium shadow-lg">
                {location.name}
              </div>
            </div>
          </motion.button>
        </div>
      ))}

      {/* Info card for selected location */}
      <AnimatePresence>
        {showInfo && activeMarker && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 right-8 z-30 w-80"
          >
            {locations.map((location) => (
              location.id === activeMarker && (
                <div 
                  key={location.id}
                  className="bg-white rounded-xl overflow-hidden shadow-2xl"
                >
                  {/* Header with location name */}
                  <div 
                    className="p-4 flex justify-between items-center"
                    style={{ backgroundColor: location.color }}
                  >
                    <h3 className="font-bold text-lg text-white">{location.name}</h3>
                    <button 
                      onClick={() => setShowInfo(false)}
                      className="text-white/80 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Office details */}
                  <div className="p-4 bg-white">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-slate-700">{location.address}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                        <a href={`tel:${location.phone}`} className="text-slate-700 hover:text-blue-600">
                          {location.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
                        <a href={`mailto:${location.email}`} className="text-slate-700 hover:text-blue-600">
                          {location.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-5 flex space-x-3">
                      <Button 
                        size="sm"
                        className="w-full"
                        style={{ backgroundColor: location.color }}
                        onClick={() => {
                          window.open(
                            `https://maps.google.com/?q=${encodeURIComponent(location.address)}`,
                            "_blank"
                          );
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map controls overlay */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
          <div className="flex flex-col space-y-2">
            {locations.map((location) => (
              <button
                key={location.id}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  activeMarker === location.id 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
                onClick={() => {
                  setActiveMarker(location.id);
                  setShowInfo(true);
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: location.color }}
                ></div>
                <span className="text-sm font-medium">{location.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
