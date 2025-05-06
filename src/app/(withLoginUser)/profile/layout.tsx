import ProfileMainLayout from "@/components/modules/Profile/ProfileMainLayout"
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type React from "react"

export default function AccountSettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
          <div>
            <div className="mb-20">
              <Navbar />
              </div>
              <div className="container mx-auto">
              <ProfileMainLayout>{children}</ProfileMainLayout>
              </div>
          <Footer />
              
          </div>
      );
  
  

}

