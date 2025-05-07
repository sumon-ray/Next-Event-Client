"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Heart, Award, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export default function ValuesSection() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 })

  return (
    <section ref={valuesRef} className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">What Drives Us</Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-700">The principles that guide everything we do</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Value 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-blue-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-blue-100 rounded-xl -rotate-3"></div>
                <div className="relative bg-blue-600 rounded-xl w-full h-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Security First</h3>
            <p className="text-gray-700">
              We prioritize the security of user data and financial transactions with robust JWT protection and secure
              payment processing.
            </p>
          </motion.div>

          {/* Value 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-indigo-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-indigo-100 rounded-xl -rotate-3"></div>
                <div className="relative bg-indigo-600 rounded-xl w-full h-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Community Focus</h3>
            <p className="text-gray-700">
              We build features that foster meaningful connections and community engagement through well-moderated
              events.
            </p>
          </motion.div>

          {/* Value 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-purple-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-purple-100 rounded-xl -rotate-3"></div>
                <div className="relative bg-purple-600 rounded-xl w-full h-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Excellence</h3>
            <p className="text-gray-700">
              We strive for excellence in our platform's performance, reliability, and user experience with every
              feature we develop.
            </p>
          </motion.div>

          {/* Value 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-teal-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-teal-100 rounded-xl -rotate-3"></div>
                <div className="relative bg-teal-600 rounded-xl w-full h-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Transparency</h3>
            <p className="text-gray-700">
              We maintain clear, transparent processes for event creation, participation, and payment handling.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
