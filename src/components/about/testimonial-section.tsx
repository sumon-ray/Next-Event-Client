"use client";

import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function TestimonialsSection() {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section
      ref={testimonialsRef}
      className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-blue-100">
            Hear from event organizers and attendees who use our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={testimonialsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel className="w-full">
            <CarouselContent>
              {/* Testimonial 1 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/30">
                      <Image
                   src="/images/testimonial/user2.jpg"

                        alt="Robert Taylor"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Robert Taylor</h4>
                      <p className="text-blue-200 text-sm">
                        Conference Organizer
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="italic">
                    &quot;EventHub transformed how we manage our annual tech
                    conference. The payment integration and approval workflows
                    save us countless hours of manual work. I can not imagine
                    organizing events without it now!&quot;
                  </p>
                </div>
              </CarouselItem>

              {/* Testimonial 2 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/30">
                      <Image
                      src="/images/testimonial/user3.jpg"

                        alt="Jennifer Kim"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Jennifer Kim</h4>
                      <p className="text-blue-200 text-sm">Community Leader</p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="italic">
                    &quot;As someone who runs both free and paid workshops, I
                    love how flexible the platform is. The private event option
                    lets me create exclusive experiences for my community while
                    keeping everything organized.&quot;
                  </p>
                </div>
              </CarouselItem>

              {/* Testimonial 3 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/30">
                      <Image
                    src="/images/testimonial/user1.jpg"

                        alt="Marcus Johnson"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Marcus Johnson</h4>
                      <p className="text-blue-200 text-sm">Regular Attendee</p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    {[...Array(1)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="italic">
                    &quot;I have discovered so many amazing events through
                    EventHub. The payment process is seamless, and I appreciate
                    knowing that private events are properly vetted. It is
                    become my go-to platform&quot;
                  </p>
                </div>
              </CarouselItem>

              {/* Testimonial 4 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white/30">
                      <Image
                       src="/images/testimonial/user1.JPG"

                        alt="Sophia Williams"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Sophia Williams</h4>
                      <p className="text-blue-200 text-sm">Event Planner</p>
                    </div>
                  </div>
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="italic">
                    &quot;The analytics and reporting features have completely
                    changed how I approach event planning. Being able to see
                    real-time data on registrations and engagement helps me make
                    better decisions for future events.&quot;
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static translate-y-0 bg-white/20 hover:bg-white/30 text-white border-none mr-2" />
              <CarouselNext className="static translate-y-0 bg-white/20 hover:bg-white/30 text-white border-none ml-2" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
