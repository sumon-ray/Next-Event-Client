"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Heart, Award, Sparkles } from "lucide-react"
import img from "../../../public/images/register-cover.jpg"
import { Badge } from "@/components/ui/badge"
import Title from "../shared/Title"

export default function ValuesSection() {
  const valuesRef = useRef<HTMLDivElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 })

  return (
    <section ref={valuesRef} className="relative py-24 overflow-hidden bg-white">

      <div
        className="absolute top-0 left-0 z-0 w-full h-full bg-repeat "
        style={{ backgroundImage: `url(${img.src})` }}
      ></div>

      <div className="container relative z-10 px-4 mx-auto md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <p  className="mb-4 bg-[#1E3A8A] text-xs p-1 px-2 w-fit mx-auto text-white rounded-lg">@ What Drives Us</p>
        <Title title="Our Core Values"  />
          <p className="text-xl text-white">The principles that guide everything we do</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="p-8 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-blue-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-blue-100 rounded-xl -rotate-3"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-[#1E3A8A] rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Security First</h3>
            <p className="text-gray-700">
              We prioritize the security of user data and financial transactions with robust JWT protection and secure
              payment processing.
            </p>
          </motion.div>

 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="p-8 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-indigo-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-indigo-100 rounded-xl -rotate-3"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-[#10B981] rounded-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Community Focus</h3>
            <p className="text-gray-700">
              We build features that foster meaningful connections and community engagement through well-moderated
              events.
            </p>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="p-8 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-purple-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-purple-100 rounded-xl -rotate-3"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-purple-600 rounded-xl">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Excellence</h3>
            <p className="text-gray-700">
              We strive for excellence in our platforms performance, reliability, and user experience with every
              feature we develop.
            </p>
          </motion.div>

          {/* Value 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="p-8 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl"
          >
            <div className="mb-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-teal-200 rounded-xl rotate-6"></div>
                <div className="absolute inset-0 bg-teal-100 rounded-xl -rotate-3"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-teal-600 rounded-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900">Transparency</h3>
            <p className="text-gray-700">
              We maintain clear, transparent processes for event creation, participation, and payment handling.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
