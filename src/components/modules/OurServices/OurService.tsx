
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
export default function OurFeaturesSection() {
  return (
    <section className="w-full bg-[#1E293B] py-16 md:mt-40">
      <div className="container px-4 mx-auto xl:px-0">
        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
     
          <div className="space-y-10">
         
            <div className="space-y-6">
              <div className="  px-3 py-1 text-sm font-medium rounded-full text-white w-fit bg-[#1E3A8A]">
                <div className="px-3 py-1 w-fit ">@ OUR FEATURES</div>
              </div>

              <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Comprehensive Services From Concept To Execution.
              </h2>

              <p className="font-medium text-purple-200/80">
                We transform your vision into reality with our full-service event management approach, handling every
                detail from initial planning to flawless execution.
              </p>
            </div>

            
            <div className="relative">
              
              <div className="absolute left-[15px] top-[30px] bottom-[30px] w-[2px] bg-gradient-to-b from-[#1E3A8A] via-[#3B82F6] to-[#1E293B]"></div>

             
              <div className="absolute left-[9px] top-[15px] w-[14px] h-[14px] rounded-full bg-[#3B82F6]"></div>
              <div className="absolute left-[9px] bottom-[15px] w-[14px] h-[14px] rounded-full bg-[#3B82F6]"></div>

           
              <div className="grid grid-cols-1 gap-6 pl-10 md:grid-cols-2">
              
                <Card className="border-none shadow-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] ">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-white drop-shadow-sm">End-To-End Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="text-purple-100 drop-shadow-sm">
                    <p>Comprehensive event planning from initial concept development to post-event evaluation.</p>
                  </CardContent>
                </Card>

            
                <Card className="border-none shadow-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] ">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-white drop-shadow-sm">Customized Themes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-purple-100 drop-shadow-sm">
                    <p>Tailored event themes and designs that reflect your brand identity and event objectives.</p>
                  </CardContent>
                </Card>

       
                <Card className="border-none shadow-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] ">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-white drop-shadow-sm">Vendor Coordination</CardTitle>
                  </CardHeader>
                  <CardContent className="text-purple-100 drop-shadow-sm">
                    <p>Expert management of all vendors and suppliers to ensure seamless collaboration.</p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] ">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-white drop-shadow-sm">On-Site Management</CardTitle>
                  </CardHeader>
                  <CardContent className="text-purple-100 drop-shadow-sm">
                    <p>Professional on-site coordination to handle all aspects of event execution.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

       
          <div className="relative h-full overflow-hidden rounded-3xl">
            <Image
              src='/images/img13.jpg'
              alt="Event planner overseeing venue setup"
              width={6000}
              height={8000}
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
