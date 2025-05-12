"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Calendar, Users, Globe } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function MissionSection() {
  const missionRef = useRef<HTMLDivElement>(null)
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 })

  // Stats counter animation
  const [stats, setStats] = useState({ events: 0, users: 0, countries: 0 })
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })

  useEffect(() => {
    if (statsInView) {
      const interval = setInterval(() => {
        setStats((prev) => ({
          events: prev.events < 10000 ? prev.events + 500 : 10000,
          users: prev.users < 50000 ? prev.users + 2500 : 50000,
          countries: prev.countries < 25 ? prev.countries + 1 : 25,
        }))
      }, 50)

      return () => clearInterval(interval)
    }
  }, [statsInView])

  return (
    <section ref={missionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={missionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          <div className="md:w-1/2">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Our Purpose</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              At <span className="font-semibold text-blue-600">EventHub</span>, we are on a mission to transform how
              people connect through events. We believe that meaningful gatherings—whether professional conferences,
              community meetups, or private celebrations—should be accessible, secure, and easy to organize.
            </p>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Our vision is to create a world where anyone can seamlessly plan, discover, and participate in events
              that matter to them, with transparent processes for both organizers and attendees.
            </p>

            <div ref={statsRef} className="flex flex-col sm:flex-row gap-6 mt-8">
              <Card className="flex-1 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Calendar className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-700">{stats.events.toLocaleString()}+</h3>
                  <p className="text-gray-600 font-medium">Events Hosted</p>
                </CardContent>
              </Card>
              <Card className="flex-1 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-700">{stats.users.toLocaleString()}+</h3>
                  <p className="text-gray-600 font-medium">Active Users</p>
                </CardContent>
              </Card>
              <Card className="flex-1 border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Globe className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-700">{stats.countries}+</h3>
                  <p className="text-gray-600 font-medium">Countries Served</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={missionInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/memory1.jpg"
                alt="Team collaboration"
                width={800}
                height={600}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <p className="text-xl font-medium">Building connections through memorable events</p>
                </div>
              </div>
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-200 rounded-full z-0"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
