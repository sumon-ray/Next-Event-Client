"use client"

import Image from "next/image"
import { ArrowRight, Building2, CalendarHeart, GraduationCap, Music, PartyPopper, Users } from "lucide-react"

import Title from "@/components/shared/Title"
import img from '../../../../public/images/image1.jpg'
import NextButton from "@/components/shared/NextButton"
 const  EventCategories = () =>{
  const eventCategories = [
    {
      name: "Weddings",
      icon: <CalendarHeart className="w-5 h-5" />,
      description: "Elegant ceremonies and receptions tailored to your unique love story",
    },
    {
      name: "Corporate Events",
      icon: <Building2 className="w-5 h-5" />,
      description: "Professional conferences, team building, and company celebrations",
    },
    {
      name: "Social Gatherings",
      icon: <Users className="w-5 h-5" />,
      description: "Birthday parties, anniversaries, and family reunions",
    },
    {
      name: "Graduation Ceremonies",
      icon: <GraduationCap className="w-5 h-5" />,
      description: "Celebrating academic achievements with style and elegance",
    },
    {
      name: "Concerts & Performances",
      icon: <Music className="w-5 h-5" />,
      description: "Music events, theatrical performances, and entertainment shows",
    },
    {
      name: "Holiday Celebrations",
      icon: <PartyPopper className="w-5 h-5" />,
      description: "Festive gatherings for all seasonal and holiday occasions",
    },
  ]



  return (
    <div className="container px-4 py-16 mx-auto mt-20 md:mt-40 md:px-0">
      <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-2">
        
        <div className="space-y-8">
          <div className="">
            <div className="inline-flex items-center px-4 py-1 text-sm font-medium bg-[#1E3A8A] text-white w-fit rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-2"></div>
              OUR SPECIALTIES
            </div>
          <div className="my-4">
          <Title  title={" Comprehensive Event Planning For Every Occasion"} />
          </div>
            <p className="mt-4 text-gray-600">
              From intimate gatherings to grand celebrations, we bring creativity and precision to every event we plan.
              Explore our range of specialized event categories.
            </p>
          </div>

          <div className="space-y-4">
            {eventCategories.map((category, index) => (
              <div
              key={index}
              className="flex items-center p-4 duration-500 hover:scale-[1.02] hover:cursor-pointer ease-in-out  border border-gray-100 shadow-md border-t-1 rounded-xl bg-gradient-to-r from-white to-blue-300 "
            >
                <div className="flex items-center justify-center w-10 h-10 mr-4 bg-purple-100 rounded-full">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-blue-500" />
              </div>
            ))}
          </div>
        </div>

      
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={img}
              alt="Event planning professionals"
              width={600}
              height={600}
              className="object-cover w-full rounded-3xl"
            />
          </div>
          <div className="p-6 text-white bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B]  rounded-xl">
            <h3 className="mb-2 text-2xl font-bold">Let's Talk Now</h3>
            <p className="mb-4 text-lg">Ready to start planning your perfect event?</p>
            <NextButton name={"Contact Us"}/>
          </div>
        </div>
      </div>

     
     
    </div>
  )
}
export default EventCategories