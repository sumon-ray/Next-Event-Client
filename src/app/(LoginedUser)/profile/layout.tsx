"use client"

import ProfileMainLayout from "@/components/modules/Profile/ProfileMainLayout"
import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import type React from "react"

export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1">
        <ProfileMainLayout>{children}</ProfileMainLayout>
      </div>

      <Footer />
    </div>
  )
}
