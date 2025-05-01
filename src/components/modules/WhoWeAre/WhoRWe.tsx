"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Title from '@/components/shared/Title';

const WhoWeAreSection =()=> {
  return (
   <div>
    <section className="container px-4 py-16 mx-auto md:px-6 lg:py-24">
      <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
     
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/images/banner1.png" 
            alt="Event planner working"
            width={6000}
            height={6000}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-[#1E3A8A]bg-purple-100 rounded-full">
              <div className="mr-2 rounded-full px-3 py-1 bg-[#1E3A8A] text-white"> @  WHO WE ARE </div>
          
            </div>
           <Title title='Precision Planning, Flawless Execution: Your Event, Our Commitment'></Title>
            <p className="text-gray-600 ">
            At Next Event, we are more than just planners—we are creators of unforgettable experiences. Our team thrives on turning visions into reality, whether it's a vibrant public celebration or an exclusive private gathering. We believe that every event deserves exceptional care, creativity, and flawless execution. From streamlined registration flows to personalized invitations, we ensure every detail reflects excellence. With cutting-edge technology and a passion for perfection, we empower users to host, manage, and attend events with confidence. Let us help you create moments that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          
            <Card className="text-white bg-[#1E3A8A] border-none shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-lg bg-[#1E3A8A]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M12 20V10" />
                    <path d="M18 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-semibold">Your Trusted Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100">
                  We bring your vision to life with professionalism and passion.
                </p>
              </CardContent>
            </Card>

       
            <Card className="p-0 overflow-hidden border-none shadow-lg">
              <Image
                src="/images/banner1.png" 
                alt="Event professional"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </Card>
          </div>

 <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                <Check className="w-4 h-3 text-[#1E3A8A]" />
              </div>
              <p className="text-gray-600">Tailored solutions for every event</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-0.5">
                <Check className="w-4 h-3 text-[#1E3A8A]" />
              </div>
              <p className="text-gray-600">Driven by creativity and excellence</p>
            </div>
          </div>

   
          
        </div>
      </div>
    </section>
   </div>
  );
}
export default WhoWeAreSection