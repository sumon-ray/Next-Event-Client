'use client'
import ProfileMainLayout from "@/components/modules/Profile/ProfileMainLayout"
import type React from "react"
import { motion } from "framer-motion"
export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
    <div className="flex h-full bg-gradient-to-br from-[#E0F2FE] via-[#E3F2FD] to-[#F8FAFC]
flex-col w-full min-h-screen md:flex-row">
        <ProfileMainLayout>
        </ProfileMainLayout>
       
      <motion.main
        className="flex-1 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`pt-24 pb-24 md:pt-0 md:pb-0 min-h-screen  h-full px-10`}>
          {children}
        </div>
      </motion.main>
      
    </div>
   
  );



}

